import { getUpcomingAsNeededMedications, getUpcomingScheduledMedications } from "./Medications.helpers";

function buildMedication(overrides: Record<string, unknown>) {
  return {
    id: 1,
    type: "scheduled",
    isFinished: false,
    name: "",
    doseQuantity: 1,
    doseUnit: "tablet",
    frequencyValue: null,
    frequencyUnit: null,
    firstDoseDate: null,
    nextDoseDate: null,
    lastTakenAt: null,
    endDate: null,
    prescribingDoctor: null,
    notes: null,
    ...overrides,
  } as any;
}

describe("getUpcomingScheduledMedications", () => {
  it("sorts by the soonest dose, preferring nextDoseDate over firstDoseDate", () => {
    const soonest = buildMedication({ id: 1, name: "Soonest", nextDoseDate: new Date(2024, 0, 1, 8) });
    const middle = buildMedication({ id: 2, name: "Middle", firstDoseDate: new Date(2024, 0, 1, 12) });
    const latest = buildMedication({ id: 3, name: "Latest", nextDoseDate: new Date(2024, 0, 1, 20) });

    const result = getUpcomingScheduledMedications([latest, soonest, middle]);

    expect(result.map((medication) => medication.id)).toEqual([1, 2, 3]);
  });

  it("excludes medications with no dose date yet", () => {
    const withDate = buildMedication({ id: 1, nextDoseDate: new Date(2024, 0, 1) });
    const withoutDate = buildMedication({ id: 2 });

    const result = getUpcomingScheduledMedications([withoutDate, withDate]);

    expect(result.map((medication) => medication.id)).toEqual([1]);
  });

  it("limits the result to the 3 soonest medications", () => {
    const medications = Array.from({ length: 5 }, (_, index) =>
      buildMedication({ id: index, nextDoseDate: new Date(2024, 0, 1, index) }),
    );

    const result = getUpcomingScheduledMedications(medications);

    expect(result).toHaveLength(3);
    expect(result.map((medication) => medication.id)).toEqual([0, 1, 2]);
  });
});

describe("getUpcomingAsNeededMedications", () => {
  it("sorts alphabetically by name", () => {
    const medications = [
      buildMedication({ id: 1, name: "Paracetamol" }),
      buildMedication({ id: 2, name: "Aspirina" }),
      buildMedication({ id: 3, name: "Ibuprofeno" }),
    ];

    const result = getUpcomingAsNeededMedications(medications);

    expect(result.map((medication) => medication.name)).toEqual([
      "Aspirina",
      "Ibuprofeno",
      "Paracetamol",
    ]);
  });

  it("limits the result to 3 medications", () => {
    const medications = Array.from({ length: 5 }, (_, index) =>
      buildMedication({ id: index, name: `Medication ${index}` }),
    );

    const result = getUpcomingAsNeededMedications(medications);

    expect(result).toHaveLength(3);
  });

  it("does not mutate the original array", () => {
    const medications = [
      buildMedication({ id: 1, name: "Paracetamol" }),
      buildMedication({ id: 2, name: "Aspirina" }),
    ];
    const original = [...medications];

    getUpcomingAsNeededMedications(medications);

    expect(medications).toEqual(original);
  });
});
