import { AppSegmentedButtonsOption } from "@/components/ui/AppSegmentedButtons/AppSegmentedButtons.types";
import { t } from "@/i18n";

// Keys under the "medications" i18n namespace's `doseUnits`, each with
// `_one`/`_other` plural forms (see src/i18n/locales/{en,es}/medications.json).
export const DOSE_UNIT_KEYS = [
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

// Keys under the "medications" i18n namespace's `frequencyUnits`, each with
// `_one`/`_other` plural forms (see src/i18n/locales/{en,es}/medications.json).
export const FREQUENCY_UNIT_KEYS = ["hour", "day", "week", "month"] as const;

export const FORM_OPTIONS: AppSegmentedButtonsOption[] = [
  {
    label: t("medications:addMedicationForm.options.scheduled"),
    value: "scheduled",
  },
  {
    label: t("medications:addMedicationForm.options.nonScheduled"),
    value: "non-scheduled",
  },
];
