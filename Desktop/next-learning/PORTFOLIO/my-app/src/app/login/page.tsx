"use client"

import Link from "next/link";
import React, { useState } from "react";
import axios from 'axios'
import {useRouter} from 'next/navigation';
import '../css/styles.css'

 export default function LoginPage () {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });

    const onSignIn = async (e: any) => {
        e.preventDefault();
        console.log(user,'user details')
        const response = await axios.post('/api/users/login', user);
        const data = response.data;
        console.log(data,'ui response');
        router.push('/');
        return data;
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">
            <div className="UX-center-container">
                <div className="ux-components">
                    <h1 className="signup-heading">login</h1>
                        <div className="email-component">
                            <input type="text" id="email" placeholder="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                        </div>
                        <div className="password-component">
                            <input type="password" id="password" placeholder="password" value={user.password} onChange={(e) => setUser({...user,password: e.target.value})} />
                        </div>
                        <div>
                        </div>
                        <div className="UX-button-container">
                            <button className="submit-button" onClick={onSignIn}>
                                Sign In
                            </button>
                            <Link href="/signup"> new user? click to sign up </Link>
                        </div>
                </div>
            </div>
        </div>
    </main>
        
    );
 }