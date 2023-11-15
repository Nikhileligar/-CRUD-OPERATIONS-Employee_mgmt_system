import { NextRequest, NextResponse } from "next/server";
import User from '@/model/userModel.js';
import DbConfig from '@/dbconnection/dbConfig.js';
import bcrypt from 'bcryptjs';

DbConfig()

export async function POST (req: NextRequest) {
    try {
        const data = await req.json();
        const {name, email, password} = data;
        console.log(data,'log of body');
        const verifyUser = await User.findOne({email});
        console.log(verifyUser,'route response verify user');
        if (verifyUser === null) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt);
            console.log(hashPassword,'real-->',password);
            const user =  new User({
                name,
                email,
                password: hashPassword
            });
            console.log(user,'saved db response');
            await user.save();
            return NextResponse.json({
                    message: `hey! ${name}... you got signed up`,
                    data: {
                        data
                    },
                    status: 201,
                    success: true
                });
            } else {
                return NextResponse.json({
                    message:`user with this ${email} already already exists`
                });
        } 
    } catch (err) {
        console.log(err,'error in signing up');
        throw new Error('error in signing up');
    }
}