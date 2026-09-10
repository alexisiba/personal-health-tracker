import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { en, registerTranslation } from "react-native-paper-dates";
import * as z from "zod";
import { AppDateInput } from ".";

// react-native-paper-dates throws if a locale hasn't been registered; the
// app does this once in src/app/_layout.tsx, which tests don't render.
registerTranslation("en", en);

const schema = z.object({
  date: z.date({ error: "La fecha es requerida" }),
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
    defaultValues: { date: undefined },
  });

  return (
    <>
      <AppDateInput
        control={control}
        name="date"
        label="Fecha"
        inputMode="start"
        locale="en"
        required={required}
        testID="date-input"
      />
      <Text testID="submit" onPress={handleSubmit(onSubmit)}>
        Enviar
      </Text>
    </>
  );
}

describe("AppDateInput", () => {
  it("renders with the given label", async () => {
    await render(<TestForm onSubmit={jest.fn()} />);

    expect(screen.getByText("Fecha")).toBeOnTheScreen();
  });

  it("shows a red asterisk next to the label when required", async () => {
    await render(<TestForm onSubmit={jest.fn()} required />);

    expect(screen.getByText("Fecha *")).toBeOnTheScreen();
  });

  it("shows the zod validation message and blocks submit when no date is picked", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByTestId("submit"));

    expect(await screen.findByText("La fecha es requerida")).toBeOnTheScreen();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
