import { t } from "@/i18n";
import * as z from "zod";
import { DOSE_UNIT_KEYS, FREQUENCY_UNIT_KEYS } from "./Forms.constants";

export const nonScheduledFormSchema = z.object({
  medicationName: z
    .string()
    .min(1, t("medications:nonScheduledForm.errors.medicationNameRequired")),
  doseQuantity: z
    .number({ error: t("medications:nonScheduledForm.errors.doseQuantityRequired") })
    .min(1, t("medications:nonScheduledForm.errors.doseQuantityRequired")),
  doseUnit: z.enum(DOSE_UNIT_KEYS, {
    error: t("medications:nonScheduledForm.errors.doseUnitRequired"),
  }),
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
  doseUnit: z.enum(DOSE_UNIT_KEYS, {
    error: t("medications:scheduledForm.errors.doseUnitRequired"),
  }),
  frequencyValue: z
    .number({ error: t("medications:scheduledForm.errors.frequencyValueRequired") })
    .min(1, t("medications:scheduledForm.errors.frequencyValueRequired")),
  frequencyUnit: z.enum(FREQUENCY_UNIT_KEYS, {
    error: t("medications:scheduledForm.errors.frequencyUnitRequired"),
  }),
  firstDoseDate: z.date({
    error: t("medications:scheduledForm.errors.firstDoseDateRequired"),
  }),
  firstDoseTime: z.date({
    error: t("medications:scheduledForm.errors.firstDoseTimeRequired"),
  }),
  endDate: z.date().optional(),
  prescribingDoctor: z.string().optional(),
  notes: z.string().optional(),
});
