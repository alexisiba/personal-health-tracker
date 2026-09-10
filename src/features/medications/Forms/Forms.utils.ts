// Combines a date-only value with a time-only value into a single Date,
// since AppDateInput and AppTimeInput collect them as two separate fields.
export function combineDateAndTime(date: Date, time: Date) {
  const combined = new Date(date);
  combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return combined;
}
