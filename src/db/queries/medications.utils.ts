import { FREQUENCY_UNIT_VALUES } from "@/db/schema";

type FrequencyUnit = (typeof FREQUENCY_UNIT_VALUES)[number];

export function addFrequencyInterval(date: Date, value: number, unit: FrequencyUnit) {
  const result = new Date(date);

  switch (unit) {
    case "hour":
      result.setHours(result.getHours() + value);
      break;
    case "day":
      result.setDate(result.getDate() + value);
      break;
    case "week":
      result.setDate(result.getDate() + value * 7);
      break;
    case "month":
      result.setMonth(result.getMonth() + value);
      break;
  }

  return result;
}
