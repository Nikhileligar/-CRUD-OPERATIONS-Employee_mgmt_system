'use client'

import Image from 'next/image'
import Heading from './heading/page'
import '../app/css/styles.css'
import Link from 'next/link'
import axios from 'axios'
import {useRouter} from 'next/navigation';
import { useEffect } from 'react'
export default function Home() {
  const router = useRouter();
    const onLogOut = async () => {
try{
    const response = await axios.get('/api/users/signout');
    const data = response.data.data;
    router.push('/login')
    return data;
    } catch (err) {
      console.log(err,'error in logging u out');
      throw new Error('eror in logging out');
    }
}

  return (
    <div className='flex'>
      <div className="heading-container">
      <Heading />
      </div>
      <div className='right-container'>
      <div className="nav-container">
      <nav>
          <ul className="navbar">
            <li><a href="https://www.linkedin.com/in/nikhil-eligar-95b136217/">linkedln</a></li>
            <li><a onClick={onLogOut}>Logout</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="https://github.com/Nikhileligar">Git</a></li>
          </ul>
    </nav>
      </div>
      <div className="name-container">
        <h1 className='heading1'>Nikhil Eligar</h1>
      </div>
      <div className="right-contents">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Aspernatur, libero at recusandae, molestias temporibus, 
          provident ex quisquam dicta fugit laudantium nobis aperiam earum 
          culpa perferendis voluptas voluptatibus sapiente quod accusamus!
          </p>
      </div>

      </div>      
      </div>
  )
}
