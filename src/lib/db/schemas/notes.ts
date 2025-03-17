import { pgSchema, varchar, unique } from "drizzle-orm/pg-core";
import { users } from "./users";

export const notesSchema = pgSchema('notes_schema');

export const notes = notesSchema.table('notes', {
    username: varchar('username', { length: 256 })
            .references(() => users.username),
    title: varchar('title', { length: 256 }).notNull(),
            // need buffer
}, (t) => [
    unique().on(t.username, t.title)
])
