"use client"

import { login } from "@/lib/auth"
import { useActionState } from "react"

export default function Page() {
    const [data, action, isPending] = useActionState(login, undefined);    

    return (
        <form action={action}>
            <input name="username" />
            <input name="password" type="password" />
            <button type="submit"></button>
            <p>{data?.error}</p>
        </form>
    )
}
