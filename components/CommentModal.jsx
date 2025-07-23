'use client';
import { useModalContext } from "@/app/context/MyContext";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSession } from "next-auth/react";
import { HiX } from "react-icons/hi";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
import { app } from "@/firebase";


const CommentModal = () => {
    const { data: session } = useSession();
    const { isOpen, setIsOpen, commentPostId } = useModalContext();
    const [post, setPost] = useState({});
    const db = getFirestore(app);

    const [input, setInput] = useState('');

    useEffect(() => {
        if (commentPostId !== '') {
            const postRef = doc(db, 'posts', commentPostId);
            const unsubscribe = onSnapshot(postRef, (snapshot) => {
                if (snapshot.exists()) {
                    setPost(snapshot.data())
                } else {
                    console.log('No such document!')
                }
            })

            return () => unsubscribe();
        }
    }, [commentPostId])

    console.log('p[opst', post)

    const sendComment = async () => {
        
    }
    return (
        <div>
            {
                isOpen && (
                    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false} className='max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md'>
                        <div className="p-4">
                            <div className="border-b border-gray-200 py-2 px-1.5">
                                <HiX className="text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer" onClick={() => setIsOpen(false)} />
                            </div>
                            <div className="p-2 flex items-center space-x-1 relative">
                                <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"></span>
                                <img src={post?.profileImg} alt="user-img" className="h-11 w-11 rounded-full mr-4" />
                                <h4 className="font-bold sm:text-[16px] text-[15px] truncate hover:underline">{post?.name}</h4>
                                <span className="text-sm sm:text-[15px] truncate">@{post?.username}</span>
                            </div>
                            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">{post?.text}</p>
                            {/* {post?.image && <img src={post?.image} alt="post-img" className="w-sm mx-auto h-auto rounded-lg mb-2" />} */}
                            <div className="flex p-3 space-x-3">
                                <img src={session.user.image} alt="user-img" className="h-11 w-11 rounded-full mr-4 cursor-pointer hover:brightness-95" />
                                <div className="w-full divide-y divide-gray-200">
                                    <div>
                                        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 placeholder:text-gray-500" placeholder="Write your comment..." rows='2' />
                                    </div>
                                    <div className="flex items-center justify-end pt-2.5">
                                        <button onClick={sendComment} disabled={input.trim().length == ''} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Reply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </div>
    )
}
export default CommentModal;