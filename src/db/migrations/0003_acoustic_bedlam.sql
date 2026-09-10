ALTER TABLE `medications` ADD `is_finished` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `medications` ADD `next_dose_date` integer;--> statement-breakpoint
ALTER TABLE `medications` ADD `last_taken_at` integer;