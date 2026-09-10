import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { PaperProvider } from "react-native-paper";
import * as z from "zod";
import { AppQuantityUnitInput } from ".";

// See AppDropdown.test.tsx: react-native-paper-dropdown's real Menu never
// finishes opening in this test renderer (its useNativeDriver animation
// callback has no native bridge to call it back from), so we swap in a
// synchronous stand-in that preserves the same props contract.
jest.mock("react-native-paper-dropdown", () => {
  // Jest hoists jest.mock factories above imports, so they can only reach
  // dependencies via require() — not the module's own top-level imports.
  /* eslint-disable @typescript-eslint/no-require-imports */
  const { useState } = require("react");
  const { Pressable, Text: RNText } = require("react-native");
  /* eslint-enable @typescript-eslint/no-require-imports */

  function Dropdown({ testID, options, onSelect, CustomDropdownInput }: any) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Pressable testID={testID} onPress={() => setOpen((prev: boolean) => !prev)}>
          {CustomDropdownInput({})}
        </Pressable>
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

const frequencyUnitOptions = [
  { label: "Horas", value: "hours" },
  { label: "Días", value: "days" },
];

const schema = z.object({
  frequencyValue: z
    .number({ error: "La frecuencia es un campo requerido" })
    .min(1, "La frecuencia es un campo requerido"),
  frequencyUnit: z.string().min(1, "La unidad de frecuencia es un campo requerido"),
});

type FormData = z.infer<typeof schema>;

function TestForm({
  onSubmit,
  required,
}: {
  onSubmit: (data: FormData) => void;
  required?: boolean;
}) {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { frequencyValue: undefined, frequencyUnit: "" },
  });

  return (
    <PaperProvider>
      <AppQuantityUnitInput
        control={control}
        quantityName="frequencyValue"
        unitName="frequencyUnit"
        label="Frecuencia:"
        required={required}
        quantityPlaceholder="Eg: 1"
        options={frequencyUnitOptions}
        testID="frequency"
      />
      <Text testID="submit" onPress={handleSubmit(onSubmit)}>
        Enviar
      </Text>
    </PaperProvider>
  );
}

describe("AppQuantityUnitInput", () => {
  it("renders the label and reflects what the user types in the quantity field", async () => {
    await render(<TestForm onSubmit={jest.fn()} />);

    expect(screen.getByText("Frecuencia:")).toBeOnTheScreen();

    await fireEvent.changeText(screen.getByTestId("frequency-quantity"), "8");

    expect(screen.getByTestId("frequency-quantity").props.value).toBe("8");
  });

  it("submits both the quantity and the selected unit through react-hook-form", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.changeText(screen.getByTestId("frequency-quantity"), "8");
    await fireEvent.press(screen.getByTestId("frequency-unit"));
    await fireEvent.press(screen.getByText("Días"));
    await fireEvent.press(screen.getByTestId("submit"));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({ frequencyValue: 8, frequencyUnit: "days" });
  });

  it("shows a red asterisk next to the label when required", async () => {
    await render(<TestForm onSubmit={jest.fn()} required />);

    expect(screen.getByText("Frecuencia: *")).toBeOnTheScreen();
  });

  it("shows the zod validation message and blocks submit when both fields are empty", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByTestId("submit"));

    expect(
      await screen.findByText("La frecuencia es un campo requerido"),
    ).toBeOnTheScreen();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("clears the validation message once both fields are filled in", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByTestId("submit"));
    expect(
      await screen.findByText("La frecuencia es un campo requerido"),
    ).toBeOnTheScreen();

    await fireEvent.changeText(screen.getByTestId("frequency-quantity"), "8");
    await fireEvent.press(screen.getByTestId("frequency-unit"));
    await fireEvent.press(screen.getByText("Días"));
    await fireEvent.press(screen.getByTestId("submit"));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(
      screen.queryByText("La frecuencia es un campo requerido"),
    ).not.toBeOnTheScreen();
  });

  it("opens the unit dropdown, shows its options, and closes it on selection", async () => {
    await render(<TestForm onSubmit={jest.fn()} />);

    await fireEvent.press(screen.getByTestId("frequency-unit"));

    expect(screen.getByText("Horas")).toBeOnTheScreen();
    expect(screen.getByText("Días")).toBeOnTheScreen();

    await fireEvent.press(screen.getByText("Días"));

    expect(screen.queryByText("Horas")).not.toBeOnTheScreen();
  });
});
