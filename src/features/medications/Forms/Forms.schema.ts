import { t } from "@/i18n";
import * as z from "zod";

export const nonScheduledFormSchema = z.object({
  name: z.string(),
  doseQuantity: z.string(),
  doseUnit: z.string(),
});

export const scheduledFormSchema = z.object({
  medicationName: z
    .string()
    .min(1, t("medications:scheduledForm.errors.medicationNameRequired")),
  doseQuantity: z
    .number({ error: t("medications:scheduledForm.errors.doseQuantityRequired") })
    .min(1, t("medications:scheduledForm.errors.doseQuantityRequired")),
  doseUnit: z
    .string()
    .min(1, t("medications:scheduledForm.errors.doseUnitRequired")),
  frequencyValue: z
    .number({ error: t("medications:scheduledForm.errors.frequencyValueRequired") })
    .min(1, t("medications:scheduledForm.errors.frequencyValueRequired")),
  frequencyUnit: z
    .string()
    .min(1, t("medications:scheduledForm.errors.frequencyUnitRequired")),
  firstDoseDate: z.date({
    error: t("medications:scheduledForm.errors.firstDoseDateRequired"),
  }),
  endDate: z.date().optional(),
  prescribingDoctor: z.string().optional(),
  notes: z.string().optional(),
});
