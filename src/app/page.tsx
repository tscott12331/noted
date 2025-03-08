"use server"

import styles from './page.module.css';

import Sidebar from '@/components/sidebar/sidebar';

import { register } from '@/lib/auth';
import { verifyJWT } from '@/lib/jwt';

export default async function Page() {
    await register('buh', 'ster'); 
    return (
        <div className={styles.notePage}>
            <Sidebar />
            <div className={styles.noteArea}>
                <textarea className={styles.noteInput}></textarea>
            </div>
        </div> 
    )
}
