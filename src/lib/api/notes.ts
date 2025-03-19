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

export async function getNoteBuffer(title: string, token: string): Promise<any> {
    try {
        const user = await verifyJWT(token);
        if(!user) {
            return { error: true }
        }

        const res = await fetch(`${API_URL}/api/note/buffer?username=${user.payload.username}&title=${title}`, {
            headers: {
                "Cookie": `token=${token}`
            }
        })

        return await res.json();
    } catch(err) {
        console.error(err);
        return { error: true };
    }
}

export async function updateNoteBuffer(title: string, buffer: string, token: string): Promise<any> {
    try {
        const user = await verifyJWT(token);
        if(!user) {
            return { error: true };
        }

        const username = user.payload.username;

        const res = await fetch(`${API_URL}/api/note/buffer`, {
            method: "PATCH",
            body: JSON.stringify({
                username,
                title,
                buffer,
            }),
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            }
        })

        return await res.json();
    } catch(err) {
        console.error(err);
        return { error: true };
    }
}

export async function addNote(title: string, token: string) {
    try {
        const user = await verifyJWT(token);
        if(!user || !title) {
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


export async function changeNote(prevTitle: string, newTitle: string, token: string): Promise<boolean> {
    const user = await verifyJWT(token);
    if(!user || !newTitle || !prevTitle) {
        return false;
    }

    try {
        let res = await fetch(`${API_URL}/api/note`, {
            method: "PATCH",
            body: JSON.stringify({
                prevTitle,
                newTitle,
                username: user.payload.username
            }),
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            }
        })
        
        return res.status === 200; 
    } catch(err) {
        console.error(err);
        return false;
    }

}

export async function deleteNote(title: string, token: string): Promise<boolean> {
    const user = await verifyJWT(token);
    if(!user || !title) {
        return false;
    }
   
    try {
        let res = await fetch(`${API_URL}/api/note?username=${user.payload.username}&title=${title}`, {
            method: "DELETE",
            headers: {
                "Cookie": `token=${token}`
            }
        })
        return res.status === 200;
    } catch(err) {
        console.error(err);
        return false;
    }

}
