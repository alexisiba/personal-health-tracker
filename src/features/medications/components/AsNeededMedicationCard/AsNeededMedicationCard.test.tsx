import { fireEvent, render, screen } from "@testing-library/react-native";
// Ensures the global i18next instance is initialized before this component's
// useTranslation() call resolves any key — the app does this once via
// src/app/_layout.tsx, which this standalone component test doesn't render.
import "@/i18n";
import { AsNeededMedicationCard } from ".";

describe("AsNeededMedicationCard", () => {
  it("renders the medication's name, dose, type, and last dose date", async () => {
    await render(
      <AsNeededMedicationCard
        medication={{
          name: "Ibuprofeno",
          doseQuantity: 1,
          doseUnit: "tablet",
          lastTakenAt: new Date(2024, 0, 1, 14, 0),
        }}
        onMarkAsTaken={jest.fn()}
      />,
    );

    expect(screen.getByText("Ibuprofeno")).toBeOnTheScreen();
    expect(screen.getByText("1 Tablet")).toBeOnTheScreen();
    expect(screen.getByText("As needed")).toBeOnTheScreen();
    expect(screen.getByText("1/1/2024")).toBeOnTheScreen();
  });

  it("shows the 'Today' label when the last dose was taken today", async () => {
    await render(
      <AsNeededMedicationCard
        medication={{
          name: "Ibuprofeno",
          doseQuantity: 1,
          doseUnit: "tablet",
          lastTakenAt: new Date(),
        }}
        onMarkAsTaken={jest.fn()}
      />,
    );

    expect(screen.getByText("Today")).toBeOnTheScreen();
  });

  it("shows a dash when the medication has no recorded last dose", async () => {
    await render(
      <AsNeededMedicationCard
        medication={{ name: "Ibuprofeno", doseQuantity: 1, doseUnit: "tablet", lastTakenAt: null }}
        onMarkAsTaken={jest.fn()}
      />,
    );

    expect(screen.getByText("-")).toBeOnTheScreen();
  });

  it("pluralizes the dose unit label for a quantity greater than one", async () => {
    await render(
      <AsNeededMedicationCard
        medication={{ name: "Ibuprofeno", doseQuantity: 2, doseUnit: "tablet", lastTakenAt: null }}
        onMarkAsTaken={jest.fn()}
      />,
    );

    expect(screen.getByText("2 Tablets")).toBeOnTheScreen();
  });

  it("calls onMarkAsTaken when the button is pressed", async () => {
    const onMarkAsTaken = jest.fn();
    await render(
      <AsNeededMedicationCard
        medication={{ name: "Ibuprofeno", doseQuantity: 1, doseUnit: "tablet", lastTakenAt: null }}
        onMarkAsTaken={onMarkAsTaken}
      />,
    );

    await fireEvent.press(screen.getByText("Mark as taken"));

    expect(onMarkAsTaken).toHaveBeenCalledTimes(1);
  });
});
