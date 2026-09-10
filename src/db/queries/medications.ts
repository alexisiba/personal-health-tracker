import { db } from "@/db/client";
import { medications } from "@/db/schema";

type NewMedication = typeof medications.$inferInsert;

export async function createMedication(data: NewMedication) {
  const [medication] = await db.insert(medications).values(data).returning();
  return medication;
}
