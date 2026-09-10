import type { medications } from "@/db/schema";

type Medication = typeof medications.$inferSelect;

const UPCOMING_MEDICATIONS_LIMIT = 3;

// Scheduled: soonest dose first, medications with no dose yet excluded.
export function getUpcomingScheduledMedications(scheduledMedications: Medication[]) {
  return scheduledMedications
    .filter((medication) => medication.nextDoseDate ?? medication.firstDoseDate)
    .sort((a, b) => {
      const aDate = (a.nextDoseDate ?? a.firstDoseDate)!;
      const bDate = (b.nextDoseDate ?? b.firstDoseDate)!;
      return aDate.getTime() - bDate.getTime();
    })
    .slice(0, UPCOMING_MEDICATIONS_LIMIT);
}

// As-needed medications have no dose schedule to sort by, so alphabetical
// by name is the only stable order.
export function getUpcomingAsNeededMedications(nonScheduledMedications: Medication[]) {
  return [...nonScheduledMedications]
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, UPCOMING_MEDICATIONS_LIMIT);
}
