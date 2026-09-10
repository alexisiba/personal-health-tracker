import { getRelativeDateLabel } from "./Medications.utils";

describe("getRelativeDateLabel", () => {
  const now = new Date(2024, 0, 10, 9, 0);

  it("returns 'today' for a date on the same day as now", () => {
    expect(getRelativeDateLabel(new Date(2024, 0, 10, 23, 0), now)).toBe("today");
  });

  it("returns 'tomorrow' for a date exactly one day after now", () => {
    expect(getRelativeDateLabel(new Date(2024, 0, 11, 0, 0), now)).toBe("tomorrow");
  });

  it("returns 'date' for a date more than one day after now", () => {
    expect(getRelativeDateLabel(new Date(2024, 0, 13), now)).toBe("date");
  });

  it("returns 'date' for a date in the past", () => {
    expect(getRelativeDateLabel(new Date(2024, 0, 5), now)).toBe("date");
  });
});
