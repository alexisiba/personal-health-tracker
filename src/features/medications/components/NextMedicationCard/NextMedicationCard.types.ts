import type { medications } from "@/db/schema";

type Medication = typeof medications.$inferSelect;

export interface NextMedicationCardProps {
  medication: Pick<Medication, "name" | "doseQuantity" | "doseUnit" | "type">;
  nextDoseDate: Date;
  onMarkAsTaken: () => void;
}
