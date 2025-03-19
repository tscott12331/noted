import { db } from "@/lib/db/db";
import { notes } from "@/lib/db/schemas/notes";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get('username');
    const title = req.nextUrl.searchParams.get('title');
    if(!username || !title) {
        return NextResponse.json({ success: false },
                                 { status: 400 });
    }

    try {
        const buffer = await db.select({ buffer: notes.buffer })
                                .from(notes)
                                .where(and(eq(notes.username, username), 
                                           eq(notes.title, title)));

        if(buffer.length === 0) return NextResponse.json({ success: false },
                                                         { status: 404 });
        
        return NextResponse.json({ success: true,
                                   buffer: buffer[0],
                                 },
                                 { status: 200 });
    } catch(err) {
        console.error(err);
        return NextResponse.json({ success: false },
                                 { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    const { username, title, buffer } = await req.json();
    if(!username || !title) return NextResponse.json({ success: false }, 
                                                     { status: 400 });

    try {
        await db.update(notes)
                .set({ buffer })
                .where(and(eq(notes.username, username),
                          eq(notes.title, title)));
        return NextResponse.json({ success: true }, { status: 200 });
    } catch(err) {
        console.error(err);
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
