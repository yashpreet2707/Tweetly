import Link from 'next/link'
import React from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import Icons from './Icons'

const Post = ({ post, id }) => {

    return (
        <div className='flex p-3 border-b border-gray-200 hover:bg-gray-50'>

            <img src={post?.profileImg} alt="user-img" className='h-11 w-11 rounded-full mr-4' />
            <div className='flex-1'>
                <div className="flex items-center justify-between">
                    <div className='flex items-center space-x-1 whitespace-nowrap'>
                        <h4 className='font-bold text-sm truncate'>{post?.name}</h4>
                        <span className='text-xs truncate'>@{post?.username}</span>
                    </div>
                    <HiDotsHorizontal className='text-sm' />
                </div>
                <Link href={`/post/${id}`} >
                    <p className='text-gray-800 text-sm mt-1 pb-2'>{post?.text}</p>
                </Link>
                {post && post.image && <Link href={`/post/${id}`} >
                    <img src={post?.image} alt="post-img" className='rounded-2xl mr-2' />
                </Link>}
                <Icons id={post.id} />
            </div>
        </div >
    )
}

export default Post