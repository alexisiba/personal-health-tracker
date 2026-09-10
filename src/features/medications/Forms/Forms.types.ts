import * as z from "zod";
import { nonScheduledFormSchema, scheduledFormSchema } from "./Forms.schema";

export type ScheduledFormData = z.infer<typeof scheduledFormSchema>;
export type NonScheduledFormData = z.infer<typeof nonScheduledFormSchema>;
