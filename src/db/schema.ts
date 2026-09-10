import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Matches RegisterForm.constants.ts's SEX_OPTIONS values — kept in sync by
// hand for now, since this table isn't wired to that form yet.
export const SEX_AT_BIRTH_VALUES = [
  "male",
  "female",
  "intersexual",
  "prefere-not-say",
] as const;

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: integer("date_of_birth", { mode: "timestamp" }).notNull(),
  sexAtBirth: text("sex_at_birth", { enum: SEX_AT_BIRTH_VALUES }).notNull(),
});
