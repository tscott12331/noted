import { useEffect } from 'react';
import styles from './sidebar-note-reg.module.css';

export interface SidebarNoteRegProps {
    title: string;
    handleRemove: (title: string) => void;
}
export default function SidebarNoteReg({
    title,
    handleRemove,
}: SidebarNoteRegProps) {
    useEffect(() => {
        console.log(title);
    }, [])

    return (
        <div className={styles.sidebarNote}>
            <p>{title}</p>
            <div 
            className={styles.delSymbol}
            onClick={() => handleRemove(title)}
            ></div>
        </div>
    )
}
