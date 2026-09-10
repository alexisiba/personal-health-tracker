import { fireEvent, render, screen } from "@testing-library/react-native";
import { en, registerTranslation } from "react-native-paper-dates";
import { PaperProvider } from "react-native-paper";
import ScheduledMedicationForm from "./ScheduledMedicationForm";

// react-native-paper-dates throws if a locale hasn't been registered; the
// app does this once in src/app/_layout.tsx, which tests don't render.
registerTranslation("en", en);

// See AppDropdown.test.tsx / AppQuantityUnitInput.test.tsx: react-native-paper-dropdown's
// real Menu never finishes opening in this test renderer (its useNativeDriver animation
// callback has no native bridge to call it back from), so we swap in a synchronous
// stand-in that preserves the same props contract.
jest.mock("react-native-paper-dropdown", () => {
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

function renderForm() {
  return render(
    <PaperProvider>
      <ScheduledMedicationForm />
    </PaperProvider>,
  );
}

describe("ScheduledMedicationForm", () => {
  it("renders every field in order, with a red asterisk only on required ones", async () => {
    await renderForm();

    expect(screen.getByText("Medication name *")).toBeOnTheScreen();
    expect(screen.getByText("Dose prescribed by the doctor *")).toBeOnTheScreen();
    expect(screen.getByText("Frequency *")).toBeOnTheScreen();
    expect(screen.getByText("First dose *")).toBeOnTheScreen();
    expect(screen.getByText("End date")).toBeOnTheScreen();
    expect(screen.getByText("Additional details")).toBeOnTheScreen();
    expect(screen.getByText("Prescribing doctor")).toBeOnTheScreen();
    expect(screen.getByText("Notes")).toBeOnTheScreen();
    expect(screen.getByText("Register medication")).toBeOnTheScreen();
  });

  it("marks the section title as a screen-reader heading", async () => {
    await renderForm();

    expect(screen.getByText("Additional details").props.accessibilityRole).toBe(
      "header",
    );
  });

  it("blocks submit and shows every required-field validation error when submitted empty", async () => {
    await renderForm();

    await fireEvent.press(screen.getByText("Register medication"));

    // AppQuantityUnitInput surfaces a single combined error line per composite
    // field, prioritizing the quantity's message when both quantity and unit
    // are invalid at once (both are, on an empty submit).
    expect(
      await screen.findByText("The medication name is required"),
    ).toBeOnTheScreen();
    expect(
      screen.getByText("You must indicate the dose prescribed by the doctor"),
    ).toBeOnTheScreen();
    expect(
      screen.getByText("The frequency value is a required field"),
    ).toBeOnTheScreen();
    expect(screen.getByText("The first dose date is required")).toBeOnTheScreen();
  });

  it("shows the dose/frequency unit error once their quantities are filled in but no unit is selected", async () => {
    await renderForm();

    await fireEvent.changeText(screen.getByTestId("dose-quantity"), "1");
    await fireEvent.changeText(screen.getByTestId("frequency-quantity"), "8");

    await fireEvent.press(screen.getByText("Register medication"));

    expect(await screen.findByText("The dose type is a required field")).toBeOnTheScreen();
    expect(
      screen.getByText("The frequency unit is a required field"),
    ).toBeOnTheScreen();
  });

  it("still blocks submit on the date requirement once every other required field is filled in", async () => {
    await renderForm();

    await fireEvent.changeText(
      screen.getByTestId("medication-name-input"),
      "Ibuprofeno",
    );
    await fireEvent.changeText(screen.getByTestId("dose-quantity"), "1");
    await fireEvent.press(screen.getByTestId("dose-unit"));
    await fireEvent.press(screen.getByText("Tablet"));
    await fireEvent.changeText(screen.getByTestId("frequency-quantity"), "8");
    await fireEvent.press(screen.getByTestId("frequency-unit"));
    await fireEvent.press(screen.getByText("Hours"));

    await fireEvent.press(screen.getByText("Register medication"));

    expect(
      await screen.findByText("The first dose date is required"),
    ).toBeOnTheScreen();
    expect(
      screen.queryByText("The medication name is required"),
    ).not.toBeOnTheScreen();
    expect(
      screen.queryByText("You must indicate the dose prescribed by the doctor"),
    ).not.toBeOnTheScreen();
  });
});
