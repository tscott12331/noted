CREATE SCHEMA "notes_schema";
--> statement-breakpoint
CREATE SCHEMA "user_schema";
--> statement-breakpoint
CREATE TABLE "notes_schema"."notes" (
	"username" varchar(256),
	"title" varchar(256) NOT NULL,
	CONSTRAINT "notes_username_title_unique" UNIQUE("username","title")
);
--> statement-breakpoint
CREATE TABLE "user_schema"."users" (
	"username" varchar(256) PRIMARY KEY NOT NULL,
	"hw" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notes_schema"."notes" ADD CONSTRAINT "notes_username_users_username_fk" FOREIGN KEY ("username") REFERENCES "user_schema"."users"("username") ON DELETE no action ON UPDATE no action;