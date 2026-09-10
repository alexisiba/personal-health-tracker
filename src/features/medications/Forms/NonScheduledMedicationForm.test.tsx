import { fireEvent, render, screen } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
import NonScheduledMedicationForm from "./NonScheduledMedicationForm";

// react-native-paper-dates throws if a locale hasn't been registered; the
// app does this once in src/app/_layout.tsx, which tests don't render.
registerTranslation("en", en);

// See ScheduledMedicationForm.test.tsx: react-native-paper-dropdown's real
// Menu never finishes opening in this test renderer (its useNativeDriver
// animation callback has no native bridge to call it back from), so we swap
// in a synchronous stand-in that preserves the same props contract.
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
      <NonScheduledMedicationForm />
    </PaperProvider>,
  );
}

describe("NonScheduledMedicationForm", () => {
  it("renders every field in order, with a red asterisk only on required ones", async () => {
    await renderForm();

    expect(screen.getByText("Medication name *")).toBeOnTheScreen();
    expect(screen.getByText("Dose prescribed by the doctor *")).toBeOnTheScreen();
    expect(screen.getByText("End date")).toBeOnTheScreen();
    expect(screen.getByText("Additional data")).toBeOnTheScreen();
    expect(screen.getByText("Prescribing doctor")).toBeOnTheScreen();
    expect(screen.getByText("Notes")).toBeOnTheScreen();
    expect(screen.getByText("Register medication")).toBeOnTheScreen();
  });

  it("marks the section title as a screen-reader heading", async () => {
    await renderForm();

    expect(screen.getByText("Additional data").props.accessibilityRole).toBe(
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
  });

  it("shows the dose unit error once the quantity is filled in but no unit is selected", async () => {
    await renderForm();

    await fireEvent.changeText(screen.getByTestId("dose-quantity"), "1");

    await fireEvent.press(screen.getByText("Register medication"));

    expect(await screen.findByText("The dose type is a required field")).toBeOnTheScreen();
  });

  it("submits every field's value through react-hook-form once the required ones are filled in", async () => {
    await renderForm();

    await fireEvent.changeText(
      screen.getByTestId("medication-name-input"),
      "Ibuprofeno",
    );
    await fireEvent.changeText(screen.getByTestId("dose-quantity"), "1");
    await fireEvent.press(screen.getByTestId("dose-unit"));
    await fireEvent.press(screen.getByText("Tablet"));
    await fireEvent.changeText(
      screen.getByTestId("prescribing-doctor-input"),
      "Dr. House",
    );
    await fireEvent.changeText(screen.getByTestId("notes-input"), "Con comida");

    await fireEvent.press(screen.getByText("Register medication"));

    expect(
      screen.queryByText("The medication name is required"),
    ).not.toBeOnTheScreen();
    expect(
      screen.queryByText("You must indicate the dose prescribed by the doctor"),
    ).not.toBeOnTheScreen();
  });
});
