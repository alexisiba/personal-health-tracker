import * as z from "zod";
import { registerFormSchema } from "./RegisterForm.schemas";

export type RegisterFormData = z.infer<typeof registerFormSchema>;
