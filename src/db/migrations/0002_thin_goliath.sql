CREATE TABLE `medications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`dose_quantity` real NOT NULL,
	`dose_unit` text NOT NULL,
	`frequency_value` integer,
	`frequency_unit` text,
	`first_dose_date` integer,
	`end_date` integer,
	`prescribing_doctor` text,
	`notes` text
);
