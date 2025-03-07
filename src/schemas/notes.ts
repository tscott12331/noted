import { serial, pgSchema, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const notesSchema = pgSchema('notes_schema');

export const notes = notesSchema.table('notes', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
})
