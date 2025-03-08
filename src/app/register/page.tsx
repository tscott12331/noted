"use client"

import { register } from "@/lib/auth"
import { useActionState } from "react"

export default function Page() {
    const [data, action, isPending] = useActionState(register, undefined);    

    return (
        <form action={action}>
            <input name="username" />
            <input name="password" type="password" />
            <button type="submit"></button>
        </form>
    )
}
