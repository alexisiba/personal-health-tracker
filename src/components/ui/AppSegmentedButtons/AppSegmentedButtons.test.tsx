import { fireEvent, render, screen } from "@testing-library/react-native";
import { AppSegmentedButtons } from ".";

const options = [
  { label: "Programado", value: "scheduled" },
  { label: "No programado", value: "non-scheduled" },
];

describe("AppSegmentedButtons", () => {
  it("renders every option's label", async () => {
    await render(
      <AppSegmentedButtons options={options} value="scheduled" onPress={jest.fn()} />,
    );

    expect(screen.getByText("Programado")).toBeOnTheScreen();
    expect(screen.getByText("No programado")).toBeOnTheScreen();
  });

  it("calls onPress with the pressed option's value", async () => {
    const onPress = jest.fn();
    await render(
      <AppSegmentedButtons options={options} value="scheduled" onPress={onPress} />,
    );

    await fireEvent.press(screen.getByText("No programado"));

    expect(onPress).toHaveBeenCalledWith("non-scheduled");
  });
});
