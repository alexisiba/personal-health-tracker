import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { PaperProvider } from "react-native-paper";
import * as z from "zod";
import { AppDropdown } from ".";

// react-native-paper-dropdown's real Menu opens through a `useNativeDriver`
// animation, whose completion callback never fires in this JS-only test
// renderer (no native bridge to call it back), so the option list never
// mounts no matter how long a test waits. We swap in a plain, synchronous
// stand-in that keeps the same props contract (testID, options, value,
// onSelect, CustomDropdownInput, Touchable) so AppDropdown's own wiring is
// still exercised for real — only the third-party animated menu is faked.
jest.mock("react-native-paper-dropdown", () => {
  // Jest hoists jest.mock factories above imports, so they can only reach
  // dependencies via require() — not the module's own top-level imports.
  /* eslint-disable @typescript-eslint/no-require-imports */
  const { useState } = require("react");
  const { Pressable, Text: RNText } = require("react-native");
  /* eslint-enable @typescript-eslint/no-require-imports */

  function Dropdown({
    testID,
    options,
    onSelect,
    disabled,
    CustomDropdownInput,
    Touchable,
  }: any) {
    const [open, setOpen] = useState(false);
    const Anchor = Touchable ?? Pressable;

    return (
      <>
        <Anchor testID={testID} disabled={disabled} onPress={() => setOpen((prev: boolean) => !prev)}>
          {CustomDropdownInput({})}
        </Anchor>
        {open &&
          options.map((option: { label: string; value: string }) => (
            <Pressable
              key={option.value}
              onPress={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              <RNText>{option.label}</RNText>
            </Pressable>
          ))}
      </>
    );
  }

  return { Dropdown };
});

const options = [
  { label: "Pastilla", value: "pill" },
  { label: "Cápsula", value: "capsule" },
];

const schema = z.object({
  unit: z.string().min(1, "El tipo de medicamento es requerido"),
});

type FormData = z.infer<typeof schema>;

function TestForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { unit: "" },
  });

  return (
    <PaperProvider>
      <AppDropdown
        control={control}
        name="unit"
        label="Tipo"
        options={options}
        testID="unit-dropdown"
      />
      <Text testID="submit" onPress={handleSubmit(onSubmit)}>
        Enviar
      </Text>
    </PaperProvider>
  );
}

describe("AppDropdown", () => {
  it("renders the label and its options once opened", async () => {
    await render(<TestForm onSubmit={jest.fn()} />);

    expect(screen.getByText("Tipo")).toBeOnTheScreen();

    await fireEvent.press(screen.getByTestId("unit-dropdown"));

    expect(screen.getByText("Pastilla")).toBeOnTheScreen();
    expect(screen.getByText("Cápsula")).toBeOnTheScreen();
  });

  it("selects an option and submits its value through react-hook-form", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByTestId("unit-dropdown"));
    await fireEvent.press(screen.getByText("Cápsula"));
    await fireEvent.press(screen.getByTestId("submit"));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({ unit: "capsule" });
  });

  it("shows the zod validation message when no option is selected", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByTestId("submit"));

    expect(
      await screen.findByText("El tipo de medicamento es requerido"),
    ).toBeOnTheScreen();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
