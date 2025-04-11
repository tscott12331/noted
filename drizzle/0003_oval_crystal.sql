CREATE TABLE "refresh_tokens" (
	"token" char(36) NOT NULL,
	"username" varchar(256),
	"expires_at" date NOT NULL,
	CONSTRAINT "refresh_tokens_token_unique" UNIQUE("token"),
	CONSTRAINT "refresh_tokens_username_token_unique" UNIQUE("username","token")
);
--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_username_users_username_fk" FOREIGN KEY ("username") REFERENCES "user_schema"."users"("username") ON DELETE no action ON UPDATE no action;