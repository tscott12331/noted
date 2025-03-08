import { serial, text, pgSchema } from "drizzle-orm/pg-core";

export const userSchema = pgSchema("user_schema");

export const users = userSchema.table("users", {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    hw: text('hw').notNull(),
})

