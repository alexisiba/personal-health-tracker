import { db } from "@/db/client";
import { users } from "@/db/schema";

type NewUser = typeof users.$inferInsert;

export async function createUser(data: NewUser) {
  const [user] = await db.insert(users).values(data).returning();
  return user;
}

// The app is single-user and local-only, so the first row is the only user.
// Returns the un-awaited query builder so callers can pass it to useLiveQuery.
export function findUserQuery() {
  return db.query.users.findFirst();
}
