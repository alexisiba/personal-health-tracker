import { db } from "@/db/client";
import { medications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { addFrequencyInterval } from "./medications.utils";

type NewMedication = typeof medications.$inferInsert;

export async function createMedication(data: NewMedication) {
  // nextDoseDate is app-driven state, not something a form collects: a
  // scheduled medication starts out due at its own first dose.
  const nextDoseDate =
    data.type === "scheduled" ? (data.nextDoseDate ?? data.firstDoseDate) : data.nextDoseDate;

  const [medication] = await db
    .insert(medications)
    .values({ ...data, nextDoseDate })
    .returning();
  return medication;
}

// Returns the un-awaited query builder so callers can pass it to useLiveQuery.
// Finished medications are excluded from the active list.
export function findAllMedicationsQuery() {
  return db.query.medications.findMany({
    where: eq(medications.isFinished, false),
  });
}

// Scheduled: pushes nextDoseDate forward by the medication's own frequency.
// Non-scheduled: just records when it was taken.
export async function markMedicationAsTaken(id: number) {
  const medication = await db.query.medications.findFirst({
    where: eq(medications.id, id),
  });
  if (!medication) return;

  const now = new Date();

  if (medication.type === "scheduled" && medication.frequencyValue && medication.frequencyUnit) {
    const nextDoseDate = addFrequencyInterval(
      medication.nextDoseDate ?? now,
      medication.frequencyValue,
      medication.frequencyUnit,
    );

    await db
      .update(medications)
      .set({ nextDoseDate, lastTakenAt: now })
      .where(eq(medications.id, id));
    return;
  }

  await db.update(medications).set({ lastTakenAt: now }).where(eq(medications.id, id));
}
