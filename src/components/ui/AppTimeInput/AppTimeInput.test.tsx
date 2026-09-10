import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { useForm } from "react-hook-form";
import { PaperProvider, Text } from "react-native-paper";
import * as z from "zod";
// Ensures the global i18next instance is initialized before this component's
// useTranslation() call resolves any key — the app does this once via
// src/app/_layout.tsx, which this standalone component test doesn't render.
import "@/i18n";
import { AppTimeInput } from ".";

const schema = z.object({
  time: z.date({ error: "La hora es requerida" }),
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
    defaultValues: { time: undefined },
  });

  return (
    <PaperProvider>
      <AppTimeInput
        control={control}
        name="time"
        label="Hora"
        required={required}
        testID="time-input"
      />
      <Text testID="submit" onPress={handleSubmit(onSubmit)}>
        Enviar
      </Text>
    </PaperProvider>
  );
}

describe("AppTimeInput", () => {
  it("renders with the given label", async () => {
    await render(<TestForm onSubmit={jest.fn()} />);

    expect(screen.getByText("Hora")).toBeOnTheScreen();
  });

  it("shows a red asterisk next to the label when required", async () => {
    await render(<TestForm onSubmit={jest.fn()} required />);

    expect(screen.getByText("Hora *")).toBeOnTheScreen();
  });

  it("defaults to AM and applies the entered time on submit", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByTestId("time-input"));
    await fireEvent.changeText(screen.getByTestId("time-input-hours"), "09");
    await fireEvent.changeText(screen.getByTestId("time-input-minutes"), "30");
    await fireEvent.press(screen.getByTestId("time-input-confirm"));
    await fireEvent.press(screen.getByTestId("submit"));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const submittedTime: Date = onSubmit.mock.calls[0][0].time;
    expect(submittedTime.getHours()).toBe(9);
    expect(submittedTime.getMinutes()).toBe(30);
  });

  it("applies PM once selected, converting to 24-hour internally", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByTestId("time-input"));
    await fireEvent.changeText(screen.getByTestId("time-input-hours"), "02");
    await fireEvent.changeText(screen.getByTestId("time-input-minutes"), "30");
    await fireEvent.press(screen.getByText("PM"));
    await fireEvent.press(screen.getByTestId("time-input-confirm"));
    await fireEvent.press(screen.getByTestId("submit"));

    const submittedTime: Date = onSubmit.mock.calls[0][0].time;
    expect(submittedTime.getHours()).toBe(14);
    expect(submittedTime.getMinutes()).toBe(30);
  });

  it("lets a digit be typed right after clearing a field, without it snapping back", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByTestId("time-input"));
    await fireEvent.changeText(screen.getByTestId("time-input-hours"), "9");
    await fireEvent.changeText(screen.getByTestId("time-input-hours"), "");
    await fireEvent.changeText(screen.getByTestId("time-input-hours"), "5");
    await fireEvent.changeText(screen.getByTestId("time-input-minutes"), "15");
    await fireEvent.press(screen.getByTestId("time-input-confirm"));
    await fireEvent.press(screen.getByTestId("submit"));

    const submittedTime: Date = onSubmit.mock.calls[0][0].time;
    expect(submittedTime.getHours()).toBe(5);
  });

  it("clamps out-of-range hours and minutes on confirm", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByTestId("time-input"));
    await fireEvent.changeText(screen.getByTestId("time-input-hours"), "99");
    await fireEvent.changeText(screen.getByTestId("time-input-minutes"), "99");
    await fireEvent.press(screen.getByText("PM"));
    await fireEvent.press(screen.getByTestId("time-input-confirm"));
    await fireEvent.press(screen.getByTestId("submit"));

    const submittedTime: Date = onSubmit.mock.calls[0][0].time;
    // Hours 99 clamps to 12, and 12 PM is 12 in 24-hour time (noon).
    expect(submittedTime.getHours()).toBe(12);
    expect(submittedTime.getMinutes()).toBe(59);
  });

  it("closes without changing the value when cancelled", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByTestId("time-input"));
    await fireEvent.changeText(screen.getByTestId("time-input-hours"), "09");
    await fireEvent.press(screen.getByText("Cancel"));

    await fireEvent.press(screen.getByTestId("submit"));

    expect(await screen.findByText("La hora es requerida")).toBeOnTheScreen();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("shows the zod validation message when no time is picked", async () => {
    const onSubmit = jest.fn();
    await render(<TestForm onSubmit={onSubmit} />);

    await fireEvent.press(screen.getByTestId("submit"));

    expect(await screen.findByText("La hora es requerida")).toBeOnTheScreen();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
