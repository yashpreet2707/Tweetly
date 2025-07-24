'use client';
import { useSidebarContext } from '@/app/context/SidebarContext';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaBell, FaBookmark, FaXTwitter } from 'react-icons/fa6';
import { HiHome, HiDotsHorizontal } from 'react-icons/hi';
import { FaSearch } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { RiCommunityFill } from 'react-icons/ri';

const MobileSidebar = () => {
    const { isOpen, setIsOpen } = useSidebarContext();
    const { data: session } = useSession();

    return (
        <div className={`fixed inset-0 z-50 bg-white dark:bg-black transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 h-full shadow-lg`}>
            <div className='flex flex-col justify-between h-full p-4 pt-20'>
                <div>
                    <div className='flex flex-col gap-y-2'>
                        <Link href='/' className='flex items-center p-3 gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all'>
                            <FaSearch className='h-6 w-6' />
                            <span className='font-semibold'>Explore</span>
                        </Link>
                        <Link href='/' className='flex items-center p-3 gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all'>
                            <FaBell className='h-6 w-6' />
                            <span className='font-semibold'>Notifications</span>
                        </Link>
                        <Link href='/' className='flex items-center p-3 gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all'>
                            <MdMessage className='h-6 w-6' />
                            <span className='font-semibold'>Messages</span>
                        </Link>
                        <Link href='/' className='flex items-center p-3 gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all'>
                            <FaBookmark className='h-6 w-6' />
                            <span className='font-semibold'>Bookmarks</span>
                        </Link>
                        <Link href='/' className='flex items-center p-3 gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all'>
                            <RiCommunityFill className='h-6 w-6' />
                            <span className='font-semibold'>Communities</span>
                        </Link>
                        <Link href='/' className='flex items-center p-3 gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all'>
                            <FaXTwitter className='h-6 w-6' />
                            <span className='font-semibold'>Premium</span>
                        </Link>
                    </div>

                    {/* Auth Button */}
                    {session ? (
                        <button
                            onClick={() => signOut()}
                            className='bg-blue-400 text-white font-bold rounded-full mt-6 w-full py-2 hover:bg-blue-600 transition'
                        >
                            Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className='bg-blue-400 text-white font-bold rounded-full mt-6 w-full py-2 hover:bg-blue-600 transition'
                        >
                            Sign In
                        </button>
                    )}
                </div>

                {/* Bottom - User Info */}
                {session && (
                    <div className='flex items-center gap-2 mt-6 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition'>
                        <img src={session.user.image} alt='user-img' className='w-10 h-10 rounded-full' />
                        <div>
                            <h4 className='font-bold whitespace-nowrap text-sm'>{session.user.name}</h4>
                            <p className='text-gray-500 dark:text-gray-400 text-xs'>@{session.user.username}</p>
                        </div>
                        <HiDotsHorizontal className='ml-auto h-4 w-4' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileSidebar;
