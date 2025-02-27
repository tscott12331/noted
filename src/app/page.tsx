import styles from './page.module.css';

import Sidebar from '@/components/sidebar/sidebar';
export default function Page() {
    return (
        <div className={styles.notePage}>
            <Sidebar />
            <div className={styles.noteArea}>
                <textarea className={styles.noteInput}></textarea>
            </div>
        </div> 
    )
}
