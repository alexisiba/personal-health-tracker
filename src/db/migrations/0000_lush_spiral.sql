CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`last_name` text NOT NULL,
	`date_of_birth` integer NOT NULL,
	`sex_at_birth` text NOT NULL
);
