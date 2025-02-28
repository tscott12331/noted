"use client";

import { useState } from 'react';

import SidebarControls from './sidebar-controls';
import SidebarNote from './sidebar-note';
import SidebarAdd from './sidebar-add';

import styles from './sidebar.module.css';

export default function Sidebar() {
    const [minimized, setMinimized] = useState<boolean>(false);
    const [notes, setNotes] = useState<Array<string>>([]);

    const handleToggle = () => {
        setMinimized(!minimized);
    }

    const handleAdd = async () => {
        const newNote = "this is a note lul";
        
        setNotes([...notes, newNote]);
    }

    const handleRemove = (note: string) => {
        let newNotes = [...notes];
        newNotes.splice(newNotes.indexOf(note), 1);
        setNotes([...newNotes]);
    }
    return (
            <div className={minimized ? styles.min : styles.sidebar}>
                <SidebarControls 
                handleToggle={handleToggle} 
                handleAdd={handleAdd}
                minimized={minimized}
                /> 
                {notes.map((note, i) => 
                    <SidebarNote 
                    handleRemove={handleRemove}
                    title={note} 
                    minimized={minimized} 
                    key={i}/>
                )}
                {minimized &&
                <div className={styles.minAddWrapper}>
                    <SidebarAdd handleAdd={handleAdd}/>
                </div>
                } 
            </div>
    )
}
