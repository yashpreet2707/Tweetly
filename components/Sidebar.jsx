'use client';
import Link from 'next/link';
import React from 'react'
import { FaBell, FaBookmark, FaXTwitter } from "react-icons/fa6";
import { HiHome, HiDotsHorizontal } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { RiCommunityFill } from "react-icons/ri";
import { signIn, signOut, useSession } from "next-auth/react"

const Sidebar = () => {

  const { data: session } = useSession();
  console.log(session?.user)
  return (
    <div className='flex flex-col justify-between p-3 h-screen'>
      <div className='flex flex-col gap-4'>
        <Link href='/'>
          <FaXTwitter className='h-16 w-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200' />
        </Link>
        <div className='flex flex-col gap-y-2'>
          <Link href='/' className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'>
            <HiHome className='h-7 w-7' />
            <span className='font-bold hidden xl:inline'>Home</span>
          </Link>
          <Link href='/' className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'>
            <FaSearch className='h-7 w-7' />
            <span className='font-bold hidden xl:inline'>Explore</span>
          </Link>
          <Link href='/' className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'>
            <FaBell className='h-7 w-7' />
            <span className='font-bold hidden xl:inline'>Notifications</span>
          </Link>
          <Link href='/' className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'>
            <MdMessage className='h-7 w-7' />
            <span className='font-bold hidden xl:inline'>Messages</span>
          </Link>
          <Link href='/' className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'>
            <FaBookmark className='h-7 w-7' />
            <span className='font-bold hidden xl:inline'>Bookmarks</span>
          </Link>
          <Link href='/' className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'>
            <RiCommunityFill className='h-7 w-7' />
            <span className='font-bold hidden xl:inline'>Communities</span>
          </Link>
          <Link href='/' className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'>
            <FaXTwitter className='h-7 w-7' />
            <span className='font-bold hidden xl:inline'>Premium</span>
          </Link>
        </div>
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
      </div>
      {
        session && (
          <div className='text-gray-700 text-sm flex items-center cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200'>
            <img src={session.user.image} alt="user-img" className='w-10 h-10 rounded-full xl:mr-2' />
            <div className='hidden xl:inline'>
              <h4 className='font-bold'>{session.user.name}</h4>
              <p className='text-gray-500'>@{session.user.username}</p>
            </div>
            <HiDotsHorizontal className='h-5 w-5 ml-auto hidden xl:inline xl:ml-8' />
          </div>
        )
      }
    </div >
  )
}

export default Sidebar