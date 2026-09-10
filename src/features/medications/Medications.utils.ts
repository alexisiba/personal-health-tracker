export type RelativeDateLabel = "today" | "tomorrow" | "date";

export function getRelativeDateLabel(date: Date, now: Date = new Date()): RelativeDateLabel {
  const startOfDay = (value: Date) =>
    new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
  const diffDays = Math.round((startOfDay(date) - startOfDay(now)) / 86400000);

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "tomorrow";
  return "date";
}
