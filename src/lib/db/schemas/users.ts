import { text, pgSchema, varchar, serial } from "drizzle-orm/pg-core";

export const userSchema = pgSchema("user_schema");

export const users = userSchema.table("users", {
    username: varchar('username', { length: 256 }).primaryKey(),
    hw: text('hw').notNull(),
})

