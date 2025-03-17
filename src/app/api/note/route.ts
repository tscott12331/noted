import { db } from "@/lib/db/db";
import { notes } from "@/lib/db/schemas/notes";
import { eq, and } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get('username');
    if(!username) {
        return NextResponse.error();
    }

    try {
        const userNotes = await db.select()
                        .from(notes)
                        .where(eq(notes.username, username));
        return NextResponse.json(userNotes);
    } catch(err) {
        console.error(err);
        return NextResponse.json([]);
    }
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

export async function DELETE(req: NextRequest) {
    const username = req.nextUrl.searchParams.get('username');
    const title = req.nextUrl.searchParams.get('title');
    if(!username || !title) {
        return NextResponse.error();
    }
    
    try {                                                        
        await db.delete(notes).where(and(eq(notes.username, username), eq(notes.title, title)));
        return NextResponse.json({}, { status: 200 });
    } catch(err) {
        console.error(err);
        return NextResponse.error();
    }
}
