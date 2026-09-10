import { fireEvent, render, screen } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
import AddMedicationForm from "./AddMedicationForm";

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
      <AddMedicationForm />
    </PaperProvider>,
  );
}

describe("AddMedicationForm", () => {
  it("renders the question and both segmented options", async () => {
    await renderForm();

    expect(
      screen.getByText("How should this medication be taken?"),
    ).toBeOnTheScreen();
    expect(screen.getByText("Scheduled")).toBeOnTheScreen();
    expect(screen.getByText("As needed")).toBeOnTheScreen();
  });

  it("shows the scheduled form by default", async () => {
    await renderForm();

    // "Frequency" only exists in ScheduledMedicationForm.
    expect(screen.getByText("Frequency *")).toBeOnTheScreen();
  });

  it("switches to the non-scheduled form when its option is pressed", async () => {
    await renderForm();

    await fireEvent.press(screen.getByText("As needed"));

    // Both forms share a "Medication name" field, but only the scheduled one
    // has a frequency field — its absence confirms the switch happened.
    expect(screen.getByText("Medication name *")).toBeOnTheScreen();
    expect(screen.queryByText("Frequency *")).not.toBeOnTheScreen();
  });
});
