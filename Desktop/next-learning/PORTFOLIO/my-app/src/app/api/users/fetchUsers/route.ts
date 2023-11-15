import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import User from "@/model/userModel";

export async function GET (req: NextRequest) {
    try {
        const data = await getLoggedInUserId(req);
        console.log('data',data);
        const users = await User.findOne({_id: data._id});
        if (users) {
            return NextResponse.json({
                users,
                message:'user retrieved successfully' ,
                success:true,
                status: 200   
            });
        } else {
            return NextResponse.json({
                message:'error'
            })
        }
    } catch (err) {
        console.log(err);
        
    }
    
}

export const getLoggedInUserId = async (req: NextRequest) => {
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

