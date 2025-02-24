import styles from './sidebar-note.module.css';
export default function SidebarNote() {
    return (
        <div className={styles.sidebarNote}>
            <p>this is a note lul</p>
            <div className={styles.delSymbol}></div>
        </div>
    );
}
