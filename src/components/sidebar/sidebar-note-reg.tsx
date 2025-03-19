import { useEffect, useRef, useState } from 'react';
import styles from './sidebar-note-reg.module.css';
import Image from 'next/image';

export interface SidebarNoteRegProps {
    title: string;
    handleRemove: (title: string) => void;
    handleRename: (prevName: string, newName: string) => void;
}
export default function SidebarNoteReg({
    title,
    handleRemove,
    handleRename,
}: SidebarNoteRegProps) {
    const [renaming, setRenaming] = useState<boolean>(false);
    const renameInput = useRef(null);

    useEffect(() => {
        if(renaming && renameInput) {
            renameInput.current?.focus();
        }
    }, [renaming])

    const handleDoubleClick = () => {
        setRenaming(true);
    }

    const handleKeyDown = (e) => { 
        if(e.key === "Enter" && renameInput?.current) {
            renameInput.current.blur();
            handleRename(title, renameInput.current.value);
        }
    }

    return (
        <div className={styles.sidebarNote}>
            {renaming ?
                <input 
                    ref={renameInput}
                    onBlur={() => setRenaming(false)}
                    defaultValue={title}
                    onKeyDown={handleKeyDown}
                />
            :
                <p onDoubleClick={handleDoubleClick}>{title}</p>
            }
            <div 
            className={styles.delSymbol}
            onClick={() => handleRemove(title)}
            >
                <Image src='/trash-symbol.png' alt='X' width={1413} height={1920} />
            </div>
        </div>
    )
}
