import { jwtVerify, SignJWT, importPKCS8, importSPKI } from "jose";

const alg = 'RS256'
const pkcs8: string = process.env.PR_KEY;
const spki: string = process.env.PU_KEY:

const pkey = await importPKCS8(pkcs8, alg);
const pubkey = await importSPKI(spki, alg);


export const createSignedJWT = async (userId: number) => {
    return await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(pkey);
}

export const verifyJWT = async (jwt: string) => {
    return await jwtVerify(jwt, pubkey);
}
