CREATE SCHEMA "notes_schema";
--> statement-breakpoint
CREATE SCHEMA "user_schema";
--> statement-breakpoint
CREATE TABLE "notes_schema"."notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "user_schema"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"hw" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notes_schema"."notes" ADD CONSTRAINT "notes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_schema"."users"("id") ON DELETE no action ON UPDATE no action;