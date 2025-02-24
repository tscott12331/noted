import styles from './page.module.css';
export default function Page() {
    return (
        <div className={styles.notePage}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarControls}>
                    <div className={styles.sidebarToggle}>t</div>
                    <div className={styles.sidebarAdd}>p</div>
                </div>
            </div>
            <div className={styles.noteArea}>
                <textarea className={styles.noteInput}></textarea>
            </div>
        </div> 
    )
}
