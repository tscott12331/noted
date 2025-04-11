"use server";

import bcrypt from 'bcrypt';
import { createSignedJWT } from './jwt';
import { cookies } from 'next/headers';
import { eq, sql } from 'drizzle-orm';
import { db } from './db/db';
import { users } from './db/schemas/users';
import { refreshTokens } from './db/schemas/refresh-tokens';
import { validateUsername, validatePassword } from './validation';
import { redirect } from 'next/navigation';
import { timestamp } from 'drizzle-orm/pg-core';

const REFRESH_TOKEN_EXP_OFFSET = 15778476000;

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
    
        await db.insert(users).values({
            username,
            hw
        });

        const token: string = await createSignedJWT(username);
        const refreshToken: string = crypto.randomUUID();
        
        const newDate = new Date(Date.now() + REFRESH_TOKEN_EXP_OFFSET);

        await db.insert(refreshTokens).values({
            token: refreshToken,
            username: username,
            expiresAt: sql`to_timestamp(${newDate.getTime()} / 1000.0)`
        });

         
        (await cookies()).set('token', token);
        (await cookies()).set('refresh-token', refreshToken);

    } catch(err) {
        console.error(err);
        return { error: "Server error" } 
    }

    redirect('/');
    
}

export const login = async (previousState: unknown, formData: FormData) => {
    const username = formData.get('username') as string; 
    const password = formData.get('password') as string; 

    try {
        const usersWithName = await db.select({
            username: users.username,
            hw: users.hw,
        })
        .from(users)
        .where(eq(users.username, username));
        
        if(usersWithName.length === 0) return { error: "Invalid credentials" };
        
        const user = usersWithName[0];

        const match = await bcrypt.compare(password, user.hw);

        if(!match) return { error: "Invalid credentials" };

        const token = await createSignedJWT(user.username);
        const refreshToken: string = crypto.randomUUID();
        
        const newDate = new Date(Date.now() + REFRESH_TOKEN_EXP_OFFSET);

        await db.delete(refreshTokens)
                .where(eq(refreshTokens.username, username));

        await db.insert(refreshTokens).values({
            token: refreshToken,
            username: username,
            expiresAt: sql`to_timestamp(${newDate.getTime()} / 1000.0)`
        });

        (await cookies()).set('token', token);
        (await cookies()).set('refresh-token', refreshToken);
    } catch(err) {
        console.error(err);
        return { error: "Server error" };
    }
    
    redirect('/');
}

export const logout = async () => {
    try {
        (await cookies()).delete('token');
        (await cookies()).delete('refresh-token');
    } catch(err) {
        console.error(err);
    }

    redirect('/login'); 
}


