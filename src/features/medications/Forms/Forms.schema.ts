import * as z from "zod";

export const nonScheduledFormSchema = z.object({
  name: z.string(),
  doseQuantity: z.string(),
  doseUnit: z.string(),
});

export const scheduledFormSchema = z.object({
  medicationName: z.string().min(1, "El nombre del medicamento es requerido"),
  doseQuantity: z
    .number()
    .min(1, "Debes indicar la dosis indicada por el medico"),
  doseUnit: z.string().min(1, "El tipo de medicamento es un campo requerido"),
  frequencyValue: z
    .number()
    .min(1, "El campo de frecuencia es un campo requerido"),
  frequencyUnit: z
    .string()
    .min(1, "El campo de frecuencia es un campo requerido"),
  firstDoseDate: z.date({
    error: "La fecha de la dosis es requerida",
  }),
  firstDoseTime: z.date({
    error: "La hora de la dosis es un campo requerido",
  }),
  routeOfAdministration: z.string(),
  endDate: z.date().optional(),
  notes: z.string(),
});
