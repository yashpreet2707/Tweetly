'use client';
import React from 'react';

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[100vh] px-4 text-black dark:text-white bg-white dark:bg-black'>
            <h1 className='text-6xl font-bold gradient-title mb-4'>404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className='text-gray-600 dark:text-gray-400 mb-8'>
                Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
        </div>
    );
};

export default NotFound;
