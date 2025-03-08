"use server";

import bcrypt from 'bcrypt';
import { createSignedJWT, verifyJWT } from './jwt';
import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';
import { db } from './db/db';
import { users } from './db/schemas/users';
import { validateUsername, validatePassword } from './validation';
import { redirect } from 'next/navigation';

export const register = async (previousState: unknown, formData: FormData) => {
    const username: string = formData.get('username') as string;
    const password: string = formData.get('password') as string;
    if(!validateUsername(username) || 
       !validatePassword(password)) return { error: "Invalid username or password"}

    try {
        const usersWithName = await db.select({
            username: users.username
        })
        .from(users)
        .where(eq(users.username, username));

        if(usersWithName.length > 0) return { error: "Username taken"};

        const hw = await bcrypt.hash(password, 12);
    
        const insertRes = await db.insert(users).values({
            username,
            hw
        }).returning({ id:  users.id});

        const userId = insertRes[0]?.id;

        const token = await createSignedJWT(userId);
        
        (await cookies()).set('token', token);

    } catch(err) {
        console.error(err);
        return { error: "Server error" } 
    }

    redirect('/');
    
}

export const login = async (username: string, password: string) => {
    
}

export const logout = async () => {

}


