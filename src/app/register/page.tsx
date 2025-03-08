"use client"

import styles from './page.module.css';

import { register } from "@/lib/auth";
import { useActionState } from "react";

import FormInput from '@/components/inputs/form-input';
import FormButton from '@/components/inputs/form-button';
import Link from 'next/link';

export default function Page() {
    const [data, action, isPending] = useActionState(register, undefined);    

    return (
        <div className={styles.page}>
            <form action={action}
            className={styles.form}
            >
                <div className={styles.formTitleWrapper}>
                    <h2>Create an Account</h2>
                </div>
                <div className={styles.formInputs}>
                    <FormInput name="username" labelText="Username" />
                    <FormInput name="password" labelText="Password" type="password" />
                    <FormButton text="Create" />
                </div>
                <div className={styles.formFoot}>
                    <Link href="/login">Already have an account?</Link>
                </div>
            </form>
        </div>
    )
}
