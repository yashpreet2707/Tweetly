'use client';
import React, { useEffect, useState } from 'react'
import { HiHeart, HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from 'react-icons/hi';
import { signIn, useSession } from 'next-auth/react';
import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { app } from '@/firebase';
import { useModalContext } from '@/app/context/MyContext';

const Icons = ({ id, uid }) => {
    const { data: session } = useSession();
    const db = getFirestore(app);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([]);

    const { isOpen, setIsOpen, setCommentPostId } = useModalContext();

    const likePost = async () => {
        if (session) {
            // like it 
            if (isLiked) {
                await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid))
            }
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username,
                timestamp: serverTimestamp(),
            })
        } else {
            signIn();
        }
    }
    useEffect(() => {
        onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
            setLikes(snapshot.docs);
        });
    }, [db])

    useEffect(() => {
        setIsLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
    }, [likes])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts', id, 'comments'), (snapshot) => setComments(snapshot.docs))
        return () => unsubscribe();
    }, [id,])

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            if (session?.user.uid === uid) {
                deleteDoc(doc(db, 'posts', id)).then(() => {
                    console.log("Post deleted successfully.")
                    window.location.reload();
                }).catch((err) => {
                    console.error("Error deleting the post: ", err);
                })
            } else {
                alert("You are not authorized to delete this post.")
            }
        }
    }
    return (
        <div className='flex justify-start gap-5 p-2 text-gray-500'>
            <div className='flex items-center justify-center space-x-1'>
                {isLiked ? (
                    <HiHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100' />
                ) : (
                    <HiOutlineHeart onClick={likePost} className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />
                )}
                {likes.length > 0 && <span className={`text-xs ${isLiked && "text-red-600"}`}>{likes.length}</span>}
            </div>
            <div className='flex items-center justify-center space-x-1'>
                <HiOutlineChat onClick={() => {
                    if (!session) {
                        signIn();
                    } else {
                        setIsOpen(!isOpen)
                        setCommentPostId(id);
                    }
                }} className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
                {comments.length > 0 && <span className='text-xs'>{comments.length}</span>}
            </div>
            {session?.user.uid === uid && <HiOutlineTrash className='h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' onClick={handleDelete} />}
        </div >
    )
}

export default Icons