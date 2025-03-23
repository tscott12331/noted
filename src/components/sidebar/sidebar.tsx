import { Dispatch, DragEventHandler, SetStateAction, useEffect, useState } from 'react';
import Cookies from 'js-cookie'

import SidebarControls from './sidebar-controls';
import SidebarNote from './sidebar-note';
import SidebarAdd from './sidebar-add';

import { addNote, changeNote, deleteNote } from '@/lib/api/notes';
import { logout } from '@/lib/auth';

import styles from './sidebar.module.css';

export interface SidebarProps {
    notes: Array<string>;
    setNotes: Dispatch<SetStateAction<string[]>>
    curNote: string;
    prevNote: string;
    setCurNote: Dispatch<SetStateAction<string>> 
    setPrevNote: Dispatch<SetStateAction<string>> 
}

export default function Sidebar({
    notes,
    setNotes,
    curNote,
    prevNote,
    setCurNote,
    setPrevNote,
}: SidebarProps) {
    const MAX_SB_WID = 316;
    const MIN_SB_WID = 32;
    const SB_SWITCH_THRES = 60;

    const [minimized, setMinimized] = useState<boolean>(false);
    const [sidebarWidth, setSidebarWidth] = useState<number>(158);


    const handleAdd = async () => {
        let token = Cookies.get('token');
        if(!token) return;

        let newNote = "New Note";
        let count = 0;
        
        while(notes.includes(newNote)) {
            count++;
            newNote = `New Note (${count})`;
        }
        
        setNotes([...notes, newNote]);
        addNote(newNote, token);
    }

    const handleRemove = async (note: string) => {
        const token = Cookies.get('token');
        if(!token) return;

        const deleted = await deleteNote(note, token);
        if(!deleted) return;

        let newNotes = [...notes];
        newNotes.splice(newNotes.indexOf(note), 1);
        setNotes([...newNotes]);

        if(note === curNote) {
            const includesPrev = newNotes.includes(prevNote);
            if(!includesPrev) {
                const n = newNotes[0] ? newNotes[0] : "";
                setCurNote(n);
                setPrevNote(n);
            } else {
                setCurNote(prevNote);
            }
        } else if(note === prevNote) {
            //setCurNote(curNote);
            setPrevNote(curNote); 
        }
    }

    const handleRename = async (prevName: string, newName: string) => {
        let token = Cookies.get('token');
        if(!token) return;

        let index = notes.indexOf(prevName);
        let taken = notes.includes(newName);

        if(index !== -1 && !taken) {
            const changed = await changeNote(prevName, newName, token);
            if(changed) {
                let prevNotes = [...notes];
                prevNotes[index] = newName;
                setNotes([...prevNotes]);
                setCurNote(newName);
            }
        }
        
    }

    const handleToggle = () => {
        setMinimized(!minimized);
    }

    const handleSelect = (title: string) => {
        setPrevNote(curNote);
        setCurNote(title);
    }

    const handleDrag = (e: React.DragEvent<HTMLDivElement>)=> {
        if(e.type === "drag" && minimized) setMinimized(false);

        let newWidth = e.clientX;
        if(newWidth > MAX_SB_WID) newWidth = MAX_SB_WID;
        if(newWidth < SB_SWITCH_THRES) {
            //newWidth = MIN_SB_WID;
            newWidth = SB_SWITCH_THRES;
            setMinimized(true);
        } else {
            setMinimized(false);
        }

        setSidebarWidth(newWidth);
    }

    return (
            <div className={minimized ? styles.min : styles.sidebar}>
                <SidebarControls 
                handleToggle={handleToggle} 
                handleAdd={handleAdd}
                minimized={minimized}
                /> 
                {minimized &&
                <div className={styles.minAddWrapper}>
                    <SidebarAdd handleAdd={handleAdd}/>
                </div>
                } 
                <div className={minimized ? styles.notesWrapperMin
                    : styles.notesWrapperReg}
                    style={
                        { width: minimized ? 
                                `${MIN_SB_WID}px` :
                                `${sidebarWidth}px`}}
                    >
                    {notes.map((note, i) => 
                        <SidebarNote 
                        handleRemove={handleRemove}
                        title={note} 
                        minimized={minimized} 
                        selected={curNote === note}
                        key={i}
                        handleRename={handleRename}
                        handleSelect={handleSelect}
                        />
                    )}
                </div>
                <div className={styles.logoutWrapper}
                onClick={logout}
                >
                    <img 
                    alt="Log out"
                    src="/logout.png"
                    />
                </div>
                <div 
                onDrag={handleDrag}
                onDragEnd={handleDrag}
                className={styles.resizer}
                draggable={true}
                ></div>
            </div>
    )
}
