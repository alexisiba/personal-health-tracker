import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import * as z from "zod";
import { AppTextInput } from ".";

const schema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
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
    defaultValues: { name: "" },
  });

  return (
    <>
      <AppTextInput
        control={control}
        name="name"
        label="Nombre"
        placeholder="Escribe tu nombre"
        required={required}
        testID="name-input"
      />
      <Text testID="submit" onPress={handleSubmit(onSubmit)}>
        Enviar
      </Text>
    </>
  );
}

describe("AppTextInput", () => {
  it("renders the label and reflects what the user types", async () => {
    await render(<TestForm onSubmit={jest.fn()} />);

    expect(screen.getByText("Nombre")).toBeOnTheScreen();

    await fireEvent.changeText(screen.getByTestId("name-input"), "Alexis");

    expect(screen.getByTestId("name-input").props.value).toBe("Alexis");
  });

  it("submits the value entered through react-hook-form", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.changeText(screen.getByTestId("name-input"), "Alexis");
    await fireEvent.press(screen.getByTestId("submit"));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toEqual({ name: "Alexis" });
  });

  it("shows a red asterisk next to the label when required", async () => {
    await render(<TestForm onSubmit={jest.fn()} required />);

    expect(screen.getByText("Nombre *")).toBeOnTheScreen();
  });

  it("shows the zod validation message and blocks submit when the field is invalid", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.changeText(screen.getByTestId("name-input"), "Al");
    await fireEvent.press(screen.getByTestId("submit"));

    expect(
      await screen.findByText("El nombre debe tener al menos 3 caracteres"),
    ).toBeOnTheScreen();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
