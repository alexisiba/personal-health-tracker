import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

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

// Forms.constants.ts's FORM_OPTIONS values are kept in sync with this by hand.
export const MEDICATION_TYPE_VALUES = ["scheduled", "non-scheduled"] as const;

// Forms.constants.ts's DOSE_UNIT_KEYS values are kept in sync with this by hand.
export const DOSE_UNIT_VALUES = [
  "tablet",
  "capsule",
  "coatedTablet",
  "ml",
  "drop",
  "teaspoon",
  "tablespoon",
  "application",
  "inhalation",
  "patch",
  "suppository",
  "ovule",
  "unit",
] as const;

// Forms.constants.ts's FREQUENCY_UNIT_KEYS values are kept in sync with this by hand.
export const FREQUENCY_UNIT_VALUES = ["hour", "day", "week", "month"] as const;

// Scheduled and non-scheduled medications share this table: a non-scheduled
// medication (taken as needed) omits frequencyValue/frequencyUnit/firstDoseDate,
// so those columns are nullable even though ScheduledMedicationForm requires them.
export const medications = sqliteTable("medications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type", { enum: MEDICATION_TYPE_VALUES }).notNull(),
  // Excludes a medication from the active lists/queries once the user is done
  // with it, without deleting its history.
  isFinished: integer("is_finished", { mode: "boolean" }).notNull().default(false),
  name: text("name").notNull(),
  doseQuantity: real("dose_quantity").notNull(),
  doseUnit: text("dose_unit", { enum: DOSE_UNIT_VALUES }).notNull(),
  frequencyValue: integer("frequency_value"),
  frequencyUnit: text("frequency_unit", { enum: FREQUENCY_UNIT_VALUES }),
  firstDoseDate: integer("first_dose_date", { mode: "timestamp" }),
  // Scheduled only: set to firstDoseDate when the medication is created, then
  // pushed forward by frequencyValue/frequencyUnit each time it's marked as
  // taken — this is app-driven state, never set directly from a form.
  nextDoseDate: integer("next_dose_date", { mode: "timestamp" }),
  // Non-scheduled only: when the medication was last marked as taken.
  lastTakenAt: integer("last_taken_at", { mode: "timestamp" }),
  endDate: integer("end_date", { mode: "timestamp" }),
  prescribingDoctor: text("prescribing_doctor"),
  notes: text("notes"),
});
