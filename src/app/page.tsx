"use server"

import styles from './page.module.css';

import Sidebar from '@/components/sidebar/sidebar';

import { db } from '@/lib/db';

export default async function Page() {
    const result = await db.execute('select 1');
    console.log(result);

    return (
        <div className={styles.notePage}>
            <Sidebar />
            <div className={styles.noteArea}>
                <textarea className={styles.noteInput}></textarea>
            </div>
        </div> 
    )
}
