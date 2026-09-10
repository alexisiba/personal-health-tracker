import { db } from "@/db/client";
import { users } from "@/db/schema";

type NewUser = typeof users.$inferInsert;

export async function createUser(data: NewUser) {
  const [user] = await db.insert(users).values(data).returning();
  return user;
}
