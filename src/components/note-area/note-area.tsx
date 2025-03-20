import styles from './note-area.module.css';

export interface NoteAreaProps {
    curBuff: string;
    changeBuff: (newBuff: string) => void;
}

export function NoteArea({
    curBuff,
    changeBuff,
}: NoteAreaProps) {
    return (
        <div className={styles.noteArea}>
            <textarea 
            className={styles.noteInput}
            value={curBuff}
            onChange={(e) => changeBuff(e.target.value)}
            ></textarea>
        </div>
    )
}
