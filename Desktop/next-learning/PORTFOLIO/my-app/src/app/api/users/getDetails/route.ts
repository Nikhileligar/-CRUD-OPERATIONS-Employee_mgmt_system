import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import User from "@/model/userModel";

export default async function getLoggedInUserId (req: NextRequest) {
    try {
        const token = await req.cookies.get('token')?.value || '';
        const decodeTokenData: any = await jwt.verify(token,'xyz');
        console.log(decodeTokenData,'decoded token data');
        return decodeTokenData;
    } catch (err) {
        console.log('error in get users Api',err)
        throw new Error ('error in retrieving the user details');
    }
}