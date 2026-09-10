# Component Creation Conventions

## Purpose

This Skill defines how every component must be structured in this project.

The convention is feature-based in spirit, but it is not limited to `features/`: it applies to **every** component in the app, regardless of where it lives — a global/shared component under `src/components/`, a feature-scoped component under `src/features/<feature>/...`, or a child component nested inside another component.

---

# Core Rule: Folder Name = Component Name

Every component lives in its own folder, and that folder's name is exactly the component's name, in PascalCase.

Examples: `Calendar/`, `Input/`, `AppDateInput/`.

---

# Required Files

Every component folder must always contain, at minimum, two files:

1. `ComponentName.tsx` — the actual implementation of the component.
2. `index.tsx` — re-exports the component from `ComponentName.tsx`.

The purpose of `index.tsx` is to let consumers import the component by folder name, without repeating that name in the import path.

Bad:

```ts
import { Calendar } from "@/components/ui/Calendar/Calendar";
```

Good:

```ts
import { Calendar } from "@/components/ui/Calendar";
```

Components are always exported as **named exports**, never as `export default`, in both `ComponentName.tsx` and `index.tsx`. This keeps the export name explicit everywhere (an import can't silently be renamed the way a default import can) and keeps every import in the codebase consistent.

`ComponentName.tsx` exports the component as a named function:

```tsx
export function Calendar(props: CalendarProps) {
  // ...
}
```

`index.tsx` should do nothing but re-export that same name:

```tsx
export { Calendar } from "./Calendar";
```

All implementation logic, hooks, and JSX belong in `ComponentName.tsx`, never in `index.tsx`.

---

# Child Components

When a component needs sub-components that are used exclusively by that component, and by no one else, create an internal folder named `components/` inside it. Whether a given child gets its own sub-folder depends on how simple that child is.

## Simple children: a single file

A child component is **simple** when it has no complementary files of its own (it uses the parent's `styles`/`types`/etc. directly) and has no children of its own.

A simple child does not need its own folder or `index.tsx`. It lives as a single file directly inside `components/`:

```
Calendar/
  Calendar.tsx
  Calendar.styles.ts
  Calendar.types.ts
  index.tsx
  components/
    CalendarCell.tsx
    CalendarHeader.tsx
```

`CalendarCell.tsx` imports whatever it needs straight from `Calendar.styles.ts` / `Calendar.types.ts`.

## Complex children: their own folder

A child component is **complex** when it needs its own complementary files (styles, types, utils, etc.) and/or has children of its own. In that case it must follow the exact same pattern as any top-level component: its own folder named after it, containing `ChildName.tsx` + `index.tsx`, its own complementary files at its root, and its own nested `components/` folder if it needs further children.

```
Calendar/
  Calendar.tsx
  Calendar.styles.ts
  Calendar.types.ts
  index.tsx
  components/
    CalendarCell.tsx
    CalendarHeader/
      CalendarHeader.tsx
      CalendarHeader.styles.ts
      index.tsx
      components/
        CalendarHeaderArrow.tsx
```

If a child ever grows complementary files or children of its own, promote it from a single file into its own folder following this pattern. If a child is ever needed outside its parent, it no longer qualifies as an "only used here" child — promote it out of the internal `components/` folder into its own top-level component (global under `src/components/`, or feature-level under the relevant `features/<feature>/`), following the same conventions.

---

# Complementary Files

Any complementary file — styles, types, utils, helpers, constants, data, schema, or anything else that supports the component — is named after the **original/root** component, never after the file's own sub-folder:

```
ComponentName.styles.ts
ComponentName.types.ts
ComponentName.utils.ts
ComponentName.helpers.ts
ComponentName.constants.ts
ComponentName.schema.ts
ComponentName.data.ts
```

These files always live at the root of the original component's folder — never inside the internal `components/` folder.

Child components import from these root-level files instead of creating their own duplicate `styles`/`types`/etc. files. There is a single source of truth for a component and all of its children.

---

# Testing

Every component must include its own test file, covering its correct behavior.

The test file is a complementary file named after the component, `ComponentName.test.tsx`, living at the root of the component's folder — next to `ComponentName.tsx`, not inside the internal `components/` folder:

```
Calendar/
  Calendar.tsx
  Calendar.test.tsx
  Calendar.styles.ts
  Calendar.types.ts
  index.tsx
```

Tests use Jest with the `jest-expo` preset and React Native Testing Library (see the README's Testing section). Render the component the way it is actually consumed, not in isolation — for example, a component that requires a React Hook Form `control` prop must be tested inside a small test-only wrapper that calls `useForm()` and passes real `control`/`handleSubmit`, since rendering it without one is not a supported use case and will not reflect how the component behaves in the app. See [`testing.md`](testing.md) for the concrete rules and library-specific gotchas to follow when writing the test itself.

At minimum, a component's test should cover:

- It renders correctly with the props it needs.
- Its user-facing behavior works as intended (e.g. typing updates the value, pressing calls the expected handler, a selection updates the displayed option).
- Its error/validation states are exercised, when the component has any (e.g. a validation error message is shown, and blocks whatever it should block).

Child components under an internal `components/` folder do not need their own test file — they are exercised indirectly through their parent's tests, the same way they reuse the parent's `.styles.ts`/`.types.ts` instead of duplicating them.

---

# Naming

- Folder and component names: PascalCase, matching the component's public name (`Calendar`, `Input`, `AppDateInput`).
- Complementary file suffixes are always lowercase and consistent: `.styles.ts`, `.types.ts`, `.utils.ts`, `.helpers.ts`, `.constants.ts`, `.schema.ts`, `.data.ts`, `.test.tsx`.

---

# Anti-Patterns

Avoid:

- Implementation logic written directly inside `index.tsx` instead of in `ComponentName.tsx`.
- Importing a component's implementation file directly (`.../Calendar/Calendar`) instead of through its folder (`.../Calendar`).
- Exporting a component with `export default` instead of a named export (`export function ComponentName`).
- A simple child (no complementary files, no children) given its own folder/`index.tsx` when a single file would do.
- A child-only sub-component creating its own `.styles.ts`/`.types.ts`/etc. file that duplicates what the parent already exposes.
- Complementary files (`.styles.ts`, `.types.ts`, ...) placed inside the internal `components/` folder instead of at the parent component's root.
- A genuinely reusable component left hidden inside another component's internal `components/` folder instead of being promoted to a top-level component.
- A component shipped with no `ComponentName.test.tsx`.
- Testing a component in a way it isn't actually used (e.g. rendering a component that requires a React Hook Form `control` prop on its own, instead of inside a `useForm()` test wrapper).

---

# Component Creation Checklist

Before considering a component complete, verify that:

- The folder name matches the component's name exactly.
- `ComponentName.tsx` contains the implementation, exported as a named export (`export function ComponentName`), never `export default`.
- `index.tsx` only re-exports that same named export (`export { ComponentName } from "./ComponentName";`), with no logic of its own.
- Sub-components used only by this component live inside an internal `components/` folder.
- Simple children (no own complementary files, no children of their own) are single files directly inside `components/`.
- Complex children (their own complementary files and/or their own children) have their own folder inside `components/`, following this same convention.
- All styles, types, utils, and other complementary files are named `ComponentName.*` and live at the component's root.
- Child components reuse the parent's complementary files instead of duplicating them.
- Any component that is or becomes reusable elsewhere lives at the appropriate top level (global or feature), not nested inside another component's internal `components/` folder.
- `ComponentName.test.tsx` exists at the component's root and covers rendering, user-facing behavior, and any error/validation states.
- The component is tested the way it is actually consumed (e.g. through a `useForm()` wrapper when it needs a React Hook Form `control`), not rendered in isolation from requirements it depends on.
