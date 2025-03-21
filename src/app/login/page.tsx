"use client"

import styles from './page.module.css';

import { login } from "@/lib/auth"
import { useActionState } from "react"

import FormInput from '@/components/inputs/form-input';
import FormButton from '@/components/inputs/form-button';
import Link from 'next/link';

export default function Page() {
    const [data, action, isPending] = useActionState(login, undefined);    

    return (
        <div className={styles.page}>
            <form action={action}
            className={styles.form}
            >
                <div className={styles.formTitleWrapper}>
                    <h2>Log In</h2>
                </div>
                <div className={styles.formInputs}>
                    <FormInput 
                    name="username" 
                    labelText="Username" 
                    required
                    />
                    <FormInput 
                    name="password" 
                    labelText="Password" 
                    type="password" 
                    required
                    />
                    <FormButton text="Log in" error={data?.error}/>
                </div>
                <div className={styles.formFoot}>
                    <Link href="/register">Don't have an account?</Link>
                </div>
            </form>
        </div>
    )
}
