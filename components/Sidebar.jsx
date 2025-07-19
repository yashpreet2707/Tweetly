'use client';
import Link from 'next/link';
import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";
import { signIn, signOut, useSession } from "next-auth/react"

const Sidebar = () => {

  const { data: session } = useSession();
  return (
    <div className='flex flex-col gap-4 p-3'>
      <Link href='/'>
        <FaXTwitter className='h-16 w-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200' />
      </Link>
      <Link href='/' className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'>
        <HiHome className='h-7 w-7' />
        <span className='font-bold hidden xl:inline'>Home</span>
      </Link>
      {
        session
          ? (
            <button className='bg-blue-400 text-white font-bold rounded-full mt-4 hover:brightness-95 hover:bg-blue-600 transition-all duration-200 w-48 h-9 shadow-md cursor-pointer hidden xl:inline' onClick={() => signOut()}>
              Sign Out
            </button>
          )
          : (
            <button className='bg-blue-400 text-white font-bold rounded-full mt-4 hover:brightness-95 hover:bg-blue-600 transition-all duration-200 w-48 h-9 shadow-md cursor-pointer hidden xl:inline' onClick={() => signIn()}>
              Sign In
            </button>
          )
      }
    </div >
  )
}

export default Sidebar