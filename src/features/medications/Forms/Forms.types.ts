import * as z from "zod";
import { scheduledFormSchema } from "./Forms.schema";

export type ScheduledFormData = z.infer<typeof scheduledFormSchema>;
