import { useState } from 'react';
import styles from './sidebar-note-min.module.css';

export interface SidebarNoteMinProps {
    title: string;
    handleRemove: (title: string) => void;
}
export default function SidebarNoteMin({
    title,
    handleRemove,
}: SidebarNoteMinProps) {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <div className={styles.sidebarNoteMin}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        >
            <p>{title.slice(0, 3)}</p>
            {hovered && 
                <div 
                className={styles.delSymbolMin}
                onClick={() => handleRemove(title)}
                >X</div>}
            
        </div>
    )
}
