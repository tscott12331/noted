import { Dispatch, SetStateAction } from 'react';
import styles from './note-area.module.css';

export interface NoteAreaProps {
    curBuff: string;
    changeBuff: (newBuff: string) => void;
    setHasChanges: Dispatch<SetStateAction<boolean>>;
}

export function NoteArea({
    curBuff,
    changeBuff,
    setHasChanges,
}: NoteAreaProps) {
    const handleChange = (e) => {
        changeBuff(e.target.value);
        setHasChanges(true);
    }

    return (
        <div className={styles.noteArea}>
            <textarea 
            className={styles.noteInput}
            value={curBuff}
            onChange={handleChange}
            ></textarea>
        </div>
    )
}
