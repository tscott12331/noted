import { defineConfig } from 'drizzle-kit'
import './envConfig'

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/lib/db/schemas',
    dbCredentials: {
        url: process.env.DATABASE_URL
    }
})
