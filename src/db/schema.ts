import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// RegisterForm.schemas.ts's zod schema validates against this same array, and
// RegisterForm.constants.ts's SEX_OPTIONS values are kept in sync with it by hand.
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
  // A local file URI (e.g. copied into place via expo-file-system after
  // picking), not the image's raw bytes — optional, since a profile photo
  // isn't required to finish registration.
  profileImageUri: text("profile_image_uri"),
});
