import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './sidebar-note-reg.module.css';
import Image from 'next/image';

export interface SidebarNoteRegProps {
    title: string;
    handleRemove: (title: string) => void;
    handleRename: (prevName: string, newName: string) => Promise<void>;
    selected: boolean;
    handleSelect: (title: string) => void;
}
export default function SidebarNoteReg({
    title,
    handleRemove,
    handleRename,
    selected,
    handleSelect,
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

    const handleKeyDown = async (e) => { 
        if(e.key === "Enter" && renameInput?.current) {
            await handleRename(title, renameInput.current.value);
            renameInput.current.blur();
        }
    }

    const handleClick = (e) => {
        e.stopPropagation();
        handleRemove(title)
    }

    return (
        <div 
        className={selected ? styles.sidebarNoteSel : styles.sidebarNote}
        onClick={() => handleSelect(title)}
        >
            {renaming ?
                <input 
                    ref={renameInput}
                    onBlur={() => setRenaming(false)}
                    defaultValue={title}
                    onKeyDown={handleKeyDown}
                />
            :
                <p 
            onDoubleClick={handleDoubleClick}
            >{title}</p>
            }
            <div 
            className={styles.delSymbol}
            onClick={handleClick}
            >
                <Image src='/trash-symbol.png' alt='X' width={1413} height={1920} />
            </div>
        </div>
    )
}
