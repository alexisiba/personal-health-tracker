# Testing Skill

## Purpose

This Skill defines how to write tests for components in this project: the tooling in use, and the library-specific behavior that causes confusing failures if it's missed.

It complements [`component-conventions.md`](component-conventions.md), which defines *that* every component needs a `ComponentName.test.tsx` and *where* it lives. This document defines *how* to write that test correctly.

---

# Tooling

- **Test runner**: [Jest](https://jestjs.io/), using the `jest-expo` preset (already configured in `package.json`'s `"jest"` field — no per-test setup needed).
- **Component testing**: [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) (`@testing-library/react-native`).
- **Jest matchers** (`toBeOnTheScreen()`, `toHaveTextContent()`, etc.) are available automatically just by importing from `@testing-library/react-native` — no `extend-expect` import or setup file is required in this version.

Run the full suite with `npm run test` (see the README).

---

# `render()` and `fireEvent` are asynchronous — always `await` them

This project's installed version of React Native Testing Library (v14) made `render()` and every `fireEvent.*` helper (`changeText`, `press`, `scroll`, ...) **asynchronous**. This is easy to miss because older RNTL versions (and most tutorials/examples online) had these as synchronous calls.

Forgetting `await` doesn't fail loudly — it produces confusing, misleading errors:

- Calling `screen.getByText(...)` right after an un-awaited `render(...)` throws `` `render` function has not been called `` from `screen.ts`, even though `render(...)` was called — it just hasn't finished yet.
- Calling `fireEvent.changeText(...)` without `await` and then immediately asserting on `.props.value` reads the stale, pre-change value, because the state update triggered by the event hasn't been committed yet.
- Leaving a `fireEvent` promise unawaited lets it resolve **after** the test function has already returned, which can leak into the next test (visible as a `You seem to have overlapping act() calls` warning in the console) and cause unrelated failures like `Unable to find an element with testID: ...` in a completely different test case.

The rule: always `await render(...)`, and always `await fireEvent.changeText(...)` / `await fireEvent.press(...)` / etc. Mark the `it(...)` callback `async` to do so.

```tsx
it("does the thing", async () => {
  await render(<MyComponent />);

  await fireEvent.press(screen.getByTestId("submit"));

  expect(screen.getByText("Done")).toBeOnTheScreen();
});
```

Before assuming a test's assertion is wrong or that the component under test is buggy, check first whether a `render()`/`fireEvent` call is missing its `await` — this is the most common cause of unexplained failures in this codebase's tests.

---

# Testing components that depend on React Hook Form

Several components in this project (`AppTextInput`, `AppDropdown`, `AppDateInput`, `AppQuantityUnitInput`, ...) require a real React Hook Form `control` prop and are not designed to be rendered on their own — passing a fake or partial `control` object is not a supported use case and will not reflect how the component behaves in the app.

Test these by rendering them inside a small test-only form wrapper that calls `useForm()` for real, and exposes a way to trigger submission (e.g. a `Text`/`Pressable` with a `testID` wired to `handleSubmit(onSubmit)`):

```tsx
function TestForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  return (
    <>
      <AppTextInput control={control} name="name" label="Nombre" testID="name-input" />
      <Text testID="submit" onPress={handleSubmit(onSubmit)}>
        Enviar
      </Text>
    </>
  );
}
```

This exercises the component exactly as it's used in the real app forms, and lets the test assert on the values React Hook Form actually receives (via a `jest.fn()` passed as `onSubmit`), instead of on internal component state.

---

# Locating elements

- Prefer `getByText` for static, user-visible content (labels, button text).
- Prefer `testID` for the actual interactive control (the text input, the pressable), passed straight through the component's props. React Native Paper's `TextInput` forwards `testID` down to the real native input in every mode (outlined/flat), so `getByTestId(...)` targets an element `fireEvent.changeText` can act on directly — it does not get stuck on an outer wrapper `View`.
- Use `findByText` / `findByTestId` (the `find*` async queries, or `waitFor`) for anything that appears after validation or another asynchronous state update — such as a Zod error message showing up after a submit attempt — instead of asserting immediately after firing the event.

---

# Validation / error states

To exercise a component's error state, trigger validation the same way a real user would (submitting the form), then assert on the message with an async query:

```tsx
await fireEvent.changeText(screen.getByTestId("name-input"), "Al");
await fireEvent.press(screen.getByTestId("submit"));

expect(await screen.findByText("El nombre debe tener al menos 3 caracteres")).toBeOnTheScreen();
expect(onSubmit).not.toHaveBeenCalled();
```

Even a synchronous Zod schema resolves asynchronously inside React Hook Form, so the error message will not be on screen in the same tick as `fireEvent.press` — always await it with `findByText` rather than `getByText`.

---

# Jest config already handles some library quirks

`package.json`'s `"jest"` field extends the `jest-expo` preset with a few fixes for third-party libraries used in this app. You shouldn't need to touch these again, but knowing they're there — and why — saves re-debugging the same failures:

- **`transformIgnorePatterns`** is extended to also transform `color`, `color-string`, `color-convert`, `color-name`, and `react-native-paper-dates`. `react-native-paper-dates` pins its own nested `color@5`, which ships untranspiled ESM (`import` syntax); Jest's default ignore pattern excludes all of `node_modules` from transformation, so requiring anything that imports `react-native-paper-dates` (e.g. `AppDateInput`) fails with `SyntaxError: Cannot use import statement outside a module` unless these packages are allow-listed for transformation.
- **`__mocks__/react-native-safe-area-context.js`** (a manual Jest mock, picked up automatically for any `import ... from "react-native-safe-area-context"`) re-exports the library's own official test mock (`react-native-safe-area-context/jest/mock.tsx`) flattened out of its `default` export. The library's mock file wasn't usable directly via `moduleNameMapper` — it bundles everything under a single `default` export, so a named import like `import { useSafeAreaInsets } from "react-native-safe-area-context"` resolved to `undefined` and crashed with `useSafeAreaInsets is not a function`. Without this mock, anything that calls `useSafeAreaInsets` — directly, or indirectly like React Native Paper's `Menu` — throws `No safe area value available. Make sure you are rendering <SafeAreaProvider> at the top of your app.`

---

# React Native Paper's `Portal`-based components need a real `PaperProvider`

Paper's theme context (`useTheme()`) has a safe default, so most Paper components render fine in a test with no provider at all. **`Portal`-based components are the exception** — `Menu`, `Dialog`, `Snackbar`, `Tooltip`, and anything else that renders through a `Portal` (including `react-native-paper-dropdown`'s `Dropdown`, which opens its option list in a `Menu`). These throw as soon as they try to mount their portaled content:

```
Looks like you forgot to wrap your root component with `Provider` component from `react-native-paper`.
```

Wrap the test's render tree in a real `<PaperProvider>` (imported from `react-native-paper`) whenever the component under test — or anything it renders — uses `Portal`, `Menu`, or `Dialog`.

---

# `react-native-paper-dropdown`'s `Dropdown` cannot be opened in this test renderer — mock it

`Dropdown`'s option list opens through Paper's `Menu`, which animates in via `Animated.timing(..., { useNativeDriver: true })`. A native-driven animation's "finished" callback is invoked by the native side over the bridge — there is no bridge in this JS-only test renderer (`react-test-renderer`), so that callback **never fires**, no matter how long a test waits for it (confirmed by waiting up to 5 real seconds, and by setting `theme.animation.scale = 0` — neither made a difference). `fireEvent.press` on the anchor genuinely does call `toggleMenu` (the anchor's own visible state flips), but the option list itself never mounts, so any `findByText(optionLabel)` after opening it times out.

This is a limitation of testing a native-driven `Animated` value in a renderer with no native bridge, not a bug in this project's components — don't spend time debugging your own component's press-handling code if a `Dropdown`/`AppDropdown`/`AppQuantityUnitInput` test can't find its options after "opening" it. Instead, mock `react-native-paper-dropdown` in the test file with a synchronous stand-in that preserves the same props contract (`testID`, `options`, `value`, `onSelect`, `disabled`, `CustomDropdownInput`, and `Touchable` when the component under test overrides it), so the component's *own* wiring is still exercised for real — only the third-party animated menu is faked:

```tsx
jest.mock("react-native-paper-dropdown", () => {
  /* eslint-disable @typescript-eslint/no-require-imports */
  const { useState } = require("react");
  const { Pressable, Text } = require("react-native");
  /* eslint-enable @typescript-eslint/no-require-imports */

  function Dropdown({ testID, options, onSelect, disabled, CustomDropdownInput, Touchable }: any) {
    const [open, setOpen] = useState(false);
    const Anchor = Touchable ?? Pressable;

    return (
      <>
        <Anchor testID={testID} disabled={disabled} onPress={() => setOpen((prev: boolean) => !prev)}>
          {CustomDropdownInput({})}
        </Anchor>
        {open &&
          options.map((option: { label: string; value: string }) => (
            <Pressable key={option.value} onPress={() => { onSelect(option.value); setOpen(false); }}>
              <Text>{option.label}</Text>
            </Pressable>
          ))}
      </>
    );
  }

  return { Dropdown };
});
```

`jest.mock` factories are hoisted above imports by Babel, so they can only reach dependencies via `require()` inside the factory — not the test file's own top-level imports. That's the one place `require()` is the correct, idiomatic choice over `import`, and it's fine to silence `@typescript-eslint/no-require-imports` locally for those lines.

---

# Anti-Patterns

Avoid:

- Calling `render()` or any `fireEvent.*` helper without `await`.
- Rendering a component that requires a React Hook Form `control` without a real `useForm()` wrapper.
- Asserting on an outer wrapper's `testID` instead of the actual interactive element the user would touch.
- Using `getByText`/`getByTestId` (sync queries) for content that only appears after an asynchronous state update — use `findBy*` or `waitFor` instead.
- Testing internal component state instead of user-observable behavior (what's on screen, what a passed-in handler was called with).
- Rendering a `Menu`/`Dialog`/`Dropdown`/other `Portal`-based component without a real `<PaperProvider>` wrapper.
- Trying to actually open a `react-native-paper-dropdown` `Dropdown` in a test instead of mocking it — its native-driven open animation never completes in this test renderer, so no amount of `waitFor`/timeout tuning will make the option list appear.

---

# Test Checklist

Before considering a component's test complete, verify that:

- Every `render()` and `fireEvent.*` call is `await`ed.
- A component that needs a React Hook Form `control` is tested through a real `useForm()` wrapper, not a fake `control`.
- Interactive elements are queried via `testID`/accessible queries that resolve to the actual native control, not a wrapper.
- Anything that appears asynchronously (validation errors, after a submit) is asserted with `findBy*`/`waitFor`, not a sync query.
- The test asserts on user-observable outcomes (screen content, handler calls) rather than internal implementation details.
- Any `Portal`-based component (`Menu`, `Dialog`, `Dropdown`, ...) is rendered inside a real `<PaperProvider>`.
- A `react-native-paper-dropdown` `Dropdown` (directly, or via `AppDropdown`/`AppQuantityUnitInput`) is mocked rather than opened for real.
