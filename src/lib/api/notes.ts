"use server";

const API_URL: string = process.env.URL as string;

import { verifyJWT } from "../jwt";

export async function addNote(title: string, token: string) {
    try {
        let user = await verifyJWT(token);
        if(!user) {
            console.log('not user');
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
