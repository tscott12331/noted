import { verifyJWT } from "@/lib/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    if(req.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    const tokenCookie = req.cookies.get('token');
    const token = tokenCookie?.value;
    if(!token) {
       return notAuthRedirect(req); 
    } else {
        try {
            const validToken = await verifyJWT(token);
            if(!validToken) {
                return notAuthRedirect(req);
            } else {
                return authRedirect(req);
            }
        } catch(err) {
            console.log(err);
            return notAuthRedirect(req);
        }
    }
    
}

function authRedirect(req: NextRequest) {
    if(req.nextUrl.pathname.startsWith('/login') ||
        req.nextUrl.pathname.startsWith('/register')) {
        const url = new URL('/', req.nextUrl.origin);
        return NextResponse.redirect(url);
    } else {
        return NextResponse.next();
    }

}

function notAuthRedirect(req: NextRequest) {
    if(!req.nextUrl.pathname.startsWith('/login') 
       && !req.nextUrl.pathname.startsWith('/register')) {
           const url = new URL('/login', req.nextUrl.origin);
           return NextResponse.redirect(url);
    } else {
        return NextResponse.next();
    }
}
