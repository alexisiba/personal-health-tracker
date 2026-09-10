import {
  clampHours12,
  clampMinutes,
  formatTime,
  to12Hour,
  to24Hour,
} from "./AppTimeInput.utils";

describe("formatTime", () => {
  it("formats the time using the given locale", () => {
    expect(formatTime(new Date(2024, 0, 1, 14, 0), "en")).toBe("02:00 PM");
  });
});

describe("clampHours12", () => {
  it("clamps values above 12 down to 12", () => {
    expect(clampHours12(99)).toBe(12);
  });

  it("clamps values below 1 up to 1", () => {
    expect(clampHours12(0)).toBe(1);
  });

  it("leaves a valid hour untouched", () => {
    expect(clampHours12(7)).toBe(7);
  });
});

describe("clampMinutes", () => {
  it("clamps values above 59 down to 59", () => {
    expect(clampMinutes(99)).toBe(59);
  });

  it("clamps negative values up to 0", () => {
    expect(clampMinutes(-5)).toBe(0);
  });

  it("leaves valid minutes untouched", () => {
    expect(clampMinutes(30)).toBe(30);
  });
});

describe("to12Hour", () => {
  it("converts midnight to 12 AM", () => {
    expect(to12Hour(0)).toEqual({ hours: 12, period: "AM" });
  });

  it("converts noon to 12 PM", () => {
    expect(to12Hour(12)).toEqual({ hours: 12, period: "PM" });
  });

  it("converts a morning hour", () => {
    expect(to12Hour(9)).toEqual({ hours: 9, period: "AM" });
  });

  it("converts an afternoon hour", () => {
    expect(to12Hour(14)).toEqual({ hours: 2, period: "PM" });
  });
});

describe("to24Hour", () => {
  it("converts 12 AM to midnight", () => {
    expect(to24Hour(12, "AM")).toBe(0);
  });

  it("converts 12 PM to noon", () => {
    expect(to24Hour(12, "PM")).toBe(12);
  });

  it("converts a morning hour", () => {
    expect(to24Hour(9, "AM")).toBe(9);
  });

  it("converts an afternoon hour", () => {
    expect(to24Hour(2, "PM")).toBe(14);
  });
});
