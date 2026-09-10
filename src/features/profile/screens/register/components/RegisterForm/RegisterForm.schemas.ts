import * as z from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(1, "El nombre es un campo requerido"),
  dob: z.date(),
  sexAtBirth: z.string(),
});
