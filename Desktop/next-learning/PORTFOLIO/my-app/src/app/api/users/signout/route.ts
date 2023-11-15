import {NextRequest, NextResponse} from 'next/server';

export async function GET (req: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "you have been logged out successfully",
            status: 200
        })
        response.cookies.set( "token","",
        { httpOnly: true, expires: new Date(0) }
        )
        return response;
    } catch (err: any) {
        console.log(err);
    }
};