import { db } from "@/lib/db/db";
import { notes } from "@/lib/db/schemas/notes";
import { NextResponse, NextRequest } from "next/server";

export function GET(req: NextRequest) {
    return Response.json('hello world');
}

export async function POST(req: NextRequest) {
    const { title, username } = await req.json();
    if(!title || !username) {
        return NextResponse.error();
    }

    try {
        const insNote = await db.insert(notes).values({
            title,
            username,
        })

        return NextResponse.json(insNote);

    } catch(err) {
        console.error(err);
        return NextResponse.error();
    }
}

export function PATCH(req: NextRequest) {
    return Response.json('hello world');
}

export function DELETE(req: NextRequest) {
    return Response.json('hello world');
}
