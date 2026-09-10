import type { medications } from "@/db/schema";

type Medication = typeof medications.$inferSelect;

export interface AsNeededMedicationCardProps {
  medication: Pick<Medication, "name" | "doseQuantity" | "doseUnit" | "lastTakenAt">;
  onMarkAsTaken: () => void;
}
