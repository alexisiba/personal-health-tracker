import { AppSegmentedButtonsOption } from "@/components/ui/AppSegmentedButtons/AppSegmentedButtons.types";

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

export const FORM_OPTIONS: AppSegmentedButtonsOption[] = [
  {
    label: "Programado",
    value: "scheduled",
  },
  {
    label: "Segun sea necesario",
    value: "non-scheduled",
  },
];
