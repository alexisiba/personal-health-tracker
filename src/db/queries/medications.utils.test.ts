import { addFrequencyInterval } from "./medications.utils";

describe("addFrequencyInterval", () => {
  it("adds hours", () => {
    expect(addFrequencyInterval(new Date(2024, 0, 1, 8, 0), 8, "hour")).toEqual(
      new Date(2024, 0, 1, 16, 0),
    );
  });

  it("adds days", () => {
    expect(addFrequencyInterval(new Date(2024, 0, 1), 3, "day")).toEqual(
      new Date(2024, 0, 4),
    );
  });

  it("adds weeks", () => {
    expect(addFrequencyInterval(new Date(2024, 0, 1), 2, "week")).toEqual(
      new Date(2024, 0, 15),
    );
  });

  it("adds months, rolling over into the next year", () => {
    expect(addFrequencyInterval(new Date(2024, 10, 15), 3, "month")).toEqual(
      new Date(2025, 1, 15),
    );
  });

  it("does not mutate the original date", () => {
    const original = new Date(2024, 0, 1);

    addFrequencyInterval(original, 1, "day");

    expect(original).toEqual(new Date(2024, 0, 1));
  });
});
