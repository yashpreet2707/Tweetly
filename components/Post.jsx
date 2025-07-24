import Link from 'next/link'
import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import Icons from './Icons'

const Post = ({ post, id }) => {
    return (
        <div className='flex p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]'>

            <img src={post?.profileImg} alt="user-img" className='h-11 w-11 rounded-full mr-4' />
            <div className='flex-1'>
                <div className="flex items-center justify-between">
                    <div className='flex items-center space-x-1 whitespace-nowrap'>
                        <h4 className='font-bold text-sm truncate'>{post?.name}</h4>
                        <span className='text-xs truncate text-gray-500 dark:text-gray-400'>@{post?.username}</span>
                    </div>
                    <HiDotsHorizontal className='text-sm' />
                </div>
                <Link href={`/post/${id}`}>
                    <p className='text-gray-800 dark:text-gray-200 text-sm mt-1 pb-2'>{post?.text}</p>
                </Link>
                {post?.image && (
                    <Link href={`/post/${id}`}>
                        <img src={post?.image} alt="post-img" className='rounded-2xl mr-2' />
                    </Link>
                )}
                <Icons id={post.id} uid={post.uid} />
            </div>
        </div>
    )
}

export default Post
