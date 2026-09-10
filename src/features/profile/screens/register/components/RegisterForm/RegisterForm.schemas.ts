import * as z from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(1, "El nombre es un campo requerido"),
  lastName: z.string().min(1, "Los apellidos son un campo requerido"),
  dob: z.date(),
  sexAtBirth: z.string(),
  profileImageUri: z.string().optional(),
});
