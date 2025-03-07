"use server"

import styles from './page.module.css';

import Sidebar from '@/components/sidebar/sidebar';

import { db } from '@/lib/db';

export default async function Page() {

    return (
        <div className={styles.notePage}>
            <Sidebar />
            <div className={styles.noteArea}>
                <textarea className={styles.noteInput}></textarea>
            </div>
        </div> 
    )
}
