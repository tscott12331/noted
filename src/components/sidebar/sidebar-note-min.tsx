import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './sidebar-note-min.module.css';

export interface SidebarNoteMinProps {
    title: string;
    handleRemove: (title: string) => void;
    handleRename: (prevName: string, newName: string) => Promise<void>;
    selected: boolean;
    handleSelect: (title: string) => void;
}

export default function SidebarNoteMin({
    title,
    handleRemove,
    handleRename,
    selected,
    handleSelect,
}: SidebarNoteMinProps) {
    const [hovered, setHovered] = useState<boolean>(false);
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
        handleRemove(title);
    }

    return (
        <>
        <div className={selected ? styles.sidebarNoteMinSel : styles.sidebarNoteMin}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onClick={() => handleSelect(title)}
        >
            <p
            onDoubleClick={handleDoubleClick}
            >{title.slice(0, 3)}</p>
            {hovered && 
                <div 
                className={styles.delSymbolMin}
                onClick={handleClick}
                >X</div>
            }
        </div>
        {renaming &&
            <div className={styles.renamePopupWrapper}>
                <input 
                defaultValue={title}
                ref={renameInput}
                onKeyDown={handleKeyDown}
                onBlur={() => setRenaming(false)}
                /> 
            </div>
        } 
        </>
    )
}
