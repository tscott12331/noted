import bcrypt from 'bcrypt'
import { createSignedJWT, verifyJWT } from './jwt'
import { eq } from 'drizzle-orm'
import { db } from './db/db'
import { users } from './db/schemas/users'

export const register = async (username: string, password: string) => {
    const usersWithName = await db.select({
        username: users.username
    })
    .from(users)
    .where(eq(users.username, username));

    console.log(usersWithName);
}

export const login = (username: string, password: string) => {
    
}

export const logout = () => {

}


