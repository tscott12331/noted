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
        let newNote = "New Note";
        let count = 0;
        
        while(notes.includes(newNote)) {
            count++;
            newNote = `New Note (${count})`;
        }
        
        setNotes([...notes, newNote]);
    }

    const handleRemove = (note: string) => {
        let newNotes = [...notes];
        newNotes.splice(newNotes.indexOf(note), 1);
        setNotes([...newNotes]);
    }

    const handleRename = (prevName: string, newName: string) => {
        // tmp
        let index = notes.indexOf(prevName);

        if(index !== -1) {
            let prevNotes = [...notes];
            prevNotes[index] = newName;
            setNotes([...prevNotes]);
        }
        
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
                    key={i}
                    handleRename={handleRename}
                    />
                )}
                {minimized &&
                <div className={styles.minAddWrapper}>
                    <SidebarAdd handleAdd={handleAdd}/>
                </div>
                } 
            </div>
    )
}
