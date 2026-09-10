export type Period = "AM" | "PM";

export function formatTime(date: Date, locale?: string) {
  return date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
}

export function clampHours12(hours: number) {
  return Math.min(12, Math.max(1, hours));
}

export function clampMinutes(minutes: number) {
  return Math.min(59, Math.max(0, minutes));
}

// 0 -> { hours: 12, period: "AM" } (midnight), 13 -> { hours: 1, period: "PM" }, ...
export function to12Hour(hours24: number): { hours: number; period: Period } {
  const period: Period = hours24 >= 12 ? "PM" : "AM";
  const hours = hours24 % 12 || 12;
  return { hours, period };
}

// 12 AM -> 0 (midnight), 12 PM -> 12 (noon), otherwise adds 12 for PM.
export function to24Hour(hours12: number, period: Period) {
  const hours = clampHours12(hours12);

  if (period === "AM") {
    return hours === 12 ? 0 : hours;
  }

  return hours === 12 ? 12 : hours + 12;
}
