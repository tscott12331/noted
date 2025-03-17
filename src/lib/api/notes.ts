"use server";

const API_URL: string = process.env.URL as string;

import { verifyJWT } from "../jwt";

export type Note = {
    username: string;
    title: string;
}

export async function getNotes(token: string): Promise<Array<Note>> {
    try {
        const user = await verifyJWT(token);
        if(!user) {
            return [];
        }

        const res = await fetch(`${API_URL}/api/note?username=${user.payload.username}`, {
            headers: {
                "Cookie": `token=${token}`
            }
        })

        return await res.json();
    } catch(err) {
        console.error(err);
        return [];
    }
}

export async function addNote(title: string, token: string) {
    try {
        const user = await verifyJWT(token);
        if(!user) {
            return;
        }

        let username = user.payload.username;
        
        await fetch(`${API_URL}/api/note`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                username,
            }),
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            }
        })
    } catch(err) {
        console.error(err);
    }
}


export async function changeNote(title: string, username: string) {
     
}

export async function deleteNote(title: string, username: string) {

}
