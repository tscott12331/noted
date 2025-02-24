import styles from './page.module.css';

import SidebarNote from '@/components/sidebar/sidebar-note';
import SidebarControls from '@/components/sidebar/sidebar-controls';
export default function Page() {
    return (
        <div className={styles.notePage}>
            <div className={styles.sidebar}>
                <SidebarControls /> 
                <SidebarNote />
                <SidebarNote />
                <SidebarNote />
                <SidebarNote />
                <SidebarNote />
                <SidebarNote />
            </div>
            <div className={styles.noteArea}>
                <textarea className={styles.noteInput}></textarea>
            </div>
        </div> 
    )
}
