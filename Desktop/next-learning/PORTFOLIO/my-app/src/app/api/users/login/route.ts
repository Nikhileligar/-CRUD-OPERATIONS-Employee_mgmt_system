import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import User from "@/model/userModel";
import { emit } from "process";
import { log } from "console";
import jwt from 'jsonwebtoken';


export async function POST (req: NextRequest) {
    try {
            const data = await req.json();
            const {email, password} = data;
            const users = await User.findOne({email});
            console.log(users);
            const {_id: userid, password: pwdFromDb } = users;
            // create token data
            const tokenData = {
                email:email,
                _id: userid
            };
            console.log('tokenData from login route respoonse-->',tokenData);
            const verifyPassword = await bcryptjs.compare(password, pwdFromDb);
            // add token data , secret key, expiry date
            const validateToken = jwt.sign(tokenData,'xyz',{expiresIn:'1d'});
                const response = NextResponse.json({
                    message: `yeupp! ${users.name} you have been logged in successfully`,
                    data: {
                        data
                    },
                    success: true,
                    status: 201
                })
                // 3 params 'token' , validatetoken
            if (validateToken && verifyPassword) {
                response.cookies.set('token',validateToken,{
                    httpOnly: true
                });
                return response;
            } else {
                return NextResponse.json({
                    message:`error in logging you in with ${email} forbidden`,
                    success: false,
                    status: 405
                })
            } 
    } catch (err) {
        console.log(err,'error in logging you in');
        throw new Error('error');
    }
}