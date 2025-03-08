"use server"

import styles from './page.module.css';

import Sidebar from '@/components/sidebar/sidebar';

import { register } from '@/lib/auth';
import { verifyJWT } from '@/lib/jwt';

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
