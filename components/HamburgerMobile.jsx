'use client';
import { useSidebarContext } from '@/app/context/SidebarContext'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';

const HamburgerMobile = () => {
    const { isOpen, setIsOpen } = useSidebarContext()
    return (
        <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden">
            <GiHamburgerMenu className="h-6 w-6 text-black dark:text-white cursor-pointer" />
        </button>
    )
}

export default HamburgerMobile