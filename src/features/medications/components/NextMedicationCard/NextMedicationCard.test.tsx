import { fireEvent, render, screen } from "@testing-library/react-native";
// Ensures the global i18next instance is initialized before this component's
// useTranslation() call resolves any key — the app does this once via
// src/app/_layout.tsx, which this standalone component test doesn't render.
import "@/i18n";
import { NextMedicationCard } from ".";

describe("NextMedicationCard", () => {
  it("renders the medication's name, dose, type, and next dose date/time", async () => {
    await render(
      <NextMedicationCard
        medication={{ name: "Ibuprofeno", doseQuantity: 1, doseUnit: "tablet", type: "scheduled" }}
        nextDoseDate={new Date(2024, 0, 1, 14, 0)}
        onMarkAsTaken={jest.fn()}
      />,
    );

    expect(screen.getByText("Ibuprofeno")).toBeOnTheScreen();
    expect(screen.getByText("1 Tablet")).toBeOnTheScreen();
    expect(screen.getByText("Scheduled")).toBeOnTheScreen();
    expect(screen.getByText("1/1/2024, 02:00 PM")).toBeOnTheScreen();
  });

  it("shows the 'Today' label when the next dose is today", async () => {
    const today = new Date();
    today.setHours(14, 0, 0, 0);

    await render(
      <NextMedicationCard
        medication={{ name: "Ibuprofeno", doseQuantity: 1, doseUnit: "tablet", type: "scheduled" }}
        nextDoseDate={today}
        onMarkAsTaken={jest.fn()}
      />,
    );

    expect(screen.getByText("Today, 02:00 PM")).toBeOnTheScreen();
  });

  it("pluralizes the dose unit label for a quantity greater than one", async () => {
    await render(
      <NextMedicationCard
        medication={{ name: "Ibuprofeno", doseQuantity: 2, doseUnit: "tablet", type: "non-scheduled" }}
        nextDoseDate={new Date(2024, 0, 1, 14, 0)}
        onMarkAsTaken={jest.fn()}
      />,
    );

    expect(screen.getByText("2 Tablets")).toBeOnTheScreen();
    expect(screen.getByText("As needed")).toBeOnTheScreen();
  });

  it("calls onMarkAsTaken when the button is pressed", async () => {
    const onMarkAsTaken = jest.fn();
    await render(
      <NextMedicationCard
        medication={{ name: "Ibuprofeno", doseQuantity: 1, doseUnit: "tablet", type: "scheduled" }}
        nextDoseDate={new Date(2024, 0, 1, 14, 0)}
        onMarkAsTaken={onMarkAsTaken}
      />,
    );

    await fireEvent.press(screen.getByText("Mark as taken"));

    expect(onMarkAsTaken).toHaveBeenCalledTimes(1);
  });
});
