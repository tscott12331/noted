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
    const [prevNote, setPrevNote] = useState<string>("");
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    
    useEffect(() => {
        initSidebar(); 
    }, [])


    useEffect(() => {
        if(hasChanges) {
            saveNote(prevNote, curBuff);
        }
        setHasChanges(false);
        getBuffer(); 
    }, [curNote]);

    useEffect(() => {
        if(hasChanges) {
            const timeout = setTimeout(() => {
                saveNote(curNote, curBuff);
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [curBuff])

    const saveNote = async (title: string, buff: string) => {
        if(title.length === 0) return;
        const token = Cookies.get('token');
        if(!token) return;

        const res = await updateNoteBuffer(title, buff, token);
        if(res.error) {
            console.log('Error saving note');
        } else if(res.success) {
            console.log('Saved note');
        }
    }

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
            <Sidebar 
            notes={notes} 
            setNotes={setNotes} 
            curNote={curNote} 
            setCurNote={setCurNote} 
            prevNote={prevNote}
            setPrevNote={setPrevNote}
            />
            <NoteArea 
            curBuff={curBuff}
            changeBuff={updateBuffer}
            setHasChanges={setHasChanges}
            />
        </div> 
    )
}
