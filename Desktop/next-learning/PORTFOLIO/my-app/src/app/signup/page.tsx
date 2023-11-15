"use client"

import Link from "next/link";
import React, { useState } from "react";
import axios from 'axios'
import {useRouter} from 'next/navigation';
import '../css/styles.css'

 export default function SignUp () {
    const router = useRouter();
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        password: ''
    });

    const onSignUp = async (e: any) => {
        e.preventDefault();
        console.log(user,'user details')
        const response = await axios.post('/api/users/signup', user);
        const data = response.data;
        console.log(data,'ui response');
        router.push('/login');
        return data;
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="head-compo">
                <b>
                <div className="heading1-content text-purple-200">
                    <span>P</span>
                    <span>O</span>
                    <span>R</span>
                    <span>T</span>
                    <span>F</span>
                    <span>O</span>
                    <span>L</span>
                    <span>I</span>
                    <span>O</span>
                </div>
                </b>
         </div>
      <div className="flex">
            <div className="UX-center-container">
                <div className="ux-components">
                    <h1 className="signup-heading">signup</h1>
                        <div className="email-component">
                            <input type="text" id="email" placeholder="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                        </div>
                        <div className="name-component">
                            <input type="text" id="name" placeholder="name" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/>
                        </div>
                        <div className="password-component">
                            <input type="password" id="password" placeholder="password" value={user.password} onChange={(e) => setUser({...user,password: e.target.value})} />
                        </div>
                        <div>
                        </div>
                        <div className="UX-button-container">
                            <button className="submit-button" onClick={onSignUp}>
                                signup
                            </button>
                            <Link href="/login"> visit login page </Link>
                        </div>
                </div>
            </div>
        </div>
    </main>
        
    );
 }