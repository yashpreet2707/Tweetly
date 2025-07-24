'use client';
import { useTheme } from 'next-themes';
import React from 'react'
import { HiMoon, HiSun } from 'react-icons/hi';

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme();
    return (
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer' aria-label='Toggle Theme'>
            {theme === 'dark' ? (
                <HiSun className='text-white h-6 w-6' />
            ) : (
                <HiMoon className='h-6 w-6' />
            )}
        </button>
    )
}

export default ThemeToggler