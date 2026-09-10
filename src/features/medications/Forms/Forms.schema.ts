import { t } from "@/i18n";
import * as z from "zod";

export const nonScheduledFormSchema = z.object({
  medicationName: z
    .string()
    .min(1, t("medications:nonScheduledForm.errors.medicationNameRequired")),
  doseQuantity: z
    .number({ error: t("medications:nonScheduledForm.errors.doseQuantityRequired") })
    .min(1, t("medications:nonScheduledForm.errors.doseQuantityRequired")),
  doseUnit: z
    .string()
    .min(1, t("medications:nonScheduledForm.errors.doseUnitRequired")),
  endDate: z.date().optional(),
  prescribingDoctor: z.string().optional(),
  notes: z.string().optional(),
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
