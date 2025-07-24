import React, { useEffect, useState } from 'react'
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { signIn, useSession } from 'next-auth/react';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { app } from '@/firebase';

const Comment = ({ comment, commentId, originalPostId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);

    const { data: session } = useSession();
    const db = getFirestore(app);

    const likeComment = async () => {
        if (!session) return signIn();

        const likeRef = doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session.user.uid)

        if (isLiked) {
            await deleteDoc(likeRef);
        } else {
            await setDoc(likeRef, {
                username: session.user.username,
                timestamp: serverTimestamp(),
            })
        }

    }

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'),
            (snapshot) => setLikes(snapshot.docs)
        );

        return () => unsubscribe();
    }, [db, originalPostId, commentId]);

    useEffect(() => {
        setIsLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
    }, [likes])


    return (
        <div className='flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-'>

            <img src={comment?.userImg} alt="user-img" className='h-9 w-9 rounded-full mr-4' />
            <div className='flex-1'>
                <div className="flex items-center justify-between">
                    <div className='flex items-center space-x-1 whitespace-nowrap'>
                        <h4 className='font-bold text-sm truncate'>{comment?.name}</h4>
                        <span className='text-xs truncate'>@{comment?.username}</span>
                    </div>
                    <HiDotsHorizontal className='text-sm' />
                </div>
                <p className='text-gray-800 text-sm mt-1 pb-2'>{comment?.comment}</p>

                <div className='flex items-center gap-x-1'>
                    {isLiked ? (
                        <HiHeart onClick={likeComment} className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100' />
                    ) : (
                        <HiOutlineHeart onClick={likeComment} className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />
                    )}
                    {likes.length > 0 && <span className={`text-xs ${isLiked && "text-red-600"}`}>{likes.length}</span>}
                </div>
            </div>
        </div >
    )
}

export default Comment