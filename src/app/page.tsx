"use client"

import styles from './page.module.css';

import { useState, useEffect } from 'react';

import { NoteArea } from '@/components/note-area/note-area';
import Sidebar from '@/components/sidebar/sidebar';

import Cookies from 'js-cookie';

import { getNoteBuffer, Note, updateNoteBuffer } from '@/lib/api/notes';
import { getNotes } from '@/lib/api/notes';

export default function Page() {
    const [curBuff, setCurBuff] = useState<string>("");
    const [notes, setNotes] = useState<Array<string>>([]);
    const [curNote, setCurNote] = useState<string>("");
    
    useEffect(() => {
        initSidebar(); 
    }, [])


    useEffect(() => {
        getBuffer(); 
    }, [curNote]);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const token = Cookies.get('token');
            if(!token) return;

            const res = await updateNoteBuffer(curNote, curBuff, token);
            if(res.error) {
                console.log('Error saving note');
            } else if(res.success) {
                console.log('Saved note');
            }
        }, 5000);

        return () => clearTimeout(timeout);
    }, [curBuff])

    const getBuffer = async () => {
        const token = Cookies.get('token');
        if(!token) {
            setCurBuff("");
            return;
        }

        const res = await getNoteBuffer(curNote, token);
        if(res.success && res.buffer) {
            setCurBuff(res.buffer);
        } else {
            setCurBuff("");
        }
    }

    const initSidebar = async () => {
        const token = Cookies.get('token');
        if(!token) return;

        const userNotes: Array<Note> = await getNotes(token);
         
        setNotes([...userNotes.map((n) => n.title)]);

        setCurNote(userNotes.length > 0 ? userNotes[0].title : "");
    }

    const updateBuffer = (newBuff: string) => {
        setCurBuff(newBuff);  
    }

    return (
        <div className={styles.notePage}>
            <Sidebar notes={notes} setNotes={setNotes} curNote={curNote} setCurNote={setCurNote} />
            <NoteArea 
            curBuff={curBuff}
            changeBuff={updateBuffer}
            />
        </div> 
    )
}
