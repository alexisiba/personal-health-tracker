import { fireEvent, render, screen } from "@testing-library/react-native";
import { AppButton } from ".";

describe("AppButton", () => {
  it("renders its children", async () => {
    await render(<AppButton>Guardar</AppButton>);

    expect(screen.getByText("Guardar")).toBeOnTheScreen();
  });

  it("calls onPress when pressed", async () => {
    const onPress = jest.fn();
    await render(<AppButton onPress={onPress}>Guardar</AppButton>);

    await fireEvent.press(screen.getByText("Guardar"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", async () => {
    const onPress = jest.fn();
    await render(
      <AppButton onPress={onPress} disabled>
        Guardar
      </AppButton>,
    );

    await fireEvent.press(screen.getByText("Guardar"));

    expect(onPress).not.toHaveBeenCalled();
  });
});
