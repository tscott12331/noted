"use server";

import bcrypt from 'bcrypt';
import { createSignedJWT } from './jwt';
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
    
        await db.insert(users).values({
            username,
            hw
        });

        const token = await createSignedJWT(username);
        
        (await cookies()).set('token', token);

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

        (await cookies()).set('token', token);
    } catch(err) {
        console.error(err);
        return { error: "Server error" };
    }
    
    redirect('/');
}

export const logout = async () => {
    try {
        (await cookies()).delete('token');
    } catch(err) {
        console.error(err);
    }

    redirect('/login'); 
}


