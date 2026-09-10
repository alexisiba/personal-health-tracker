import type { TFunction } from "i18next";
import { getRelativeDateLabel } from "../../Medications.utils";

export function formatLastDoseDate(
  date: Date,
  locale: string,
  t: TFunction<["medications", "common"], undefined>,
) {
  const label = getRelativeDateLabel(date);

  if (label === "today") return t("common:dateLabels.today");
  if (label === "tomorrow") return t("common:dateLabels.tomorrow");
  return date.toLocaleDateString(locale, { day: "numeric", month: "numeric", year: "numeric" });
}
