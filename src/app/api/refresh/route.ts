import { db } from "@/lib/db/db";
import { refreshTokens } from "@/lib/db/schemas/refresh-tokens";
import { createSignedJWT, verifyJWT } from "@/lib/jwt";
import { and, eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { expJWT, refToken } = await req.json();
    if(!expJWT || !refToken) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
    
    try {

        const jwtObj = await verifyJWT(expJWT);
        
        if(!jwtObj) {
            return NextResponse.json({ success: false }, { status: 401 });
        }

        const username: string = jwtObj.payload.username as string;
        if(!username) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        const refTokenArr = await db.select({ 
            username: refreshTokens.username,
            token: refreshTokens.token,
            expiresAt: refreshTokens.expiresAt
        }).from(refreshTokens)
            .where(and(eq(refreshTokens.username, username),
                       eq(refreshTokens.token, refToken)));

        if(refTokenArr.length === 0 ||
           Date.now() > refTokenArr[0].expiresAt.getTime()) {
            return NextResponse.json({ success: false }, { status: 403 });
        }

        const newJWT = await createSignedJWT(username);

        return NextResponse.json({ success: true, jwt: newJWT }, { status: 200 });

        
    } catch(err) {
        console.error(err);
        return NextResponse.json({ success: false, error: true }, { status: 500 });
    }
}
