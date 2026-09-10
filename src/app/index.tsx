import { findUserQuery } from "@/db/queries/users";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Redirect } from "expo-router";

export default function Index() {
  const { data: user, updatedAt } = useLiveQuery(findUserQuery());

  // Wait for the first read so we don't briefly flash the onboarding screen
  // for a user that does exist, before the query has resolved.
  if (!updatedAt) return null;

  return user ? <Redirect href="/(tabs)" /> : <Redirect href="/onboarding" />;
}
