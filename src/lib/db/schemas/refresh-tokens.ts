import { varchar, unique, pgTable, date, char } from "drizzle-orm/pg-core";
import { users } from "./users";

export const refreshTokens = pgTable('refresh_tokens', {
    token: char('token', { length: 36 }).notNull().unique(),
    username: varchar('username', { length: 256 })
            .references(() => users.username),
    expiresAt: date('expires_at').notNull()
}, (t) => [
    unique().on(t.username, t.token)
])
