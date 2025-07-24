'use client';
import { useModalContext } from "@/app/context/MyContext";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSession } from "next-auth/react";
import { HiX } from "react-icons/hi";
import { addDoc, collection, doc, getFirestore, onSnapshot, serverTimestamp } from "firebase/firestore";
import { app } from "@/firebase";
import { useRouter } from "next/navigation";

const CommentModal = () => {
    const { data: session } = useSession();
    const { isOpen, setIsOpen, commentPostId } = useModalContext();
    const [post, setPost] = useState({});
    const db = getFirestore(app);
    const router = useRouter();
    const [input, setInput] = useState('');

    useEffect(() => {
        if (commentPostId !== '') {
            const postRef = doc(db, 'posts', commentPostId);
            const unsubscribe = onSnapshot(postRef, (snapshot) => {
                if (snapshot.exists()) {
                    setPost(snapshot.data());
                }
            });
            return () => unsubscribe();
        }
    }, [commentPostId]);

    const sendComment = async () => {
        addDoc(collection(db, 'posts', commentPostId, 'comments'), {
            name: session.user.name,
            username: session.user.username,
            userImg: session.user.image,
            comment: input,
            timestamp: serverTimestamp(),
        }).then(() => {
            setInput('');
            setIsOpen(false);
            router.push(`/post/${commentPostId}`);
        }).catch((err) => {
            console.error("error adding the comment: ", err);
        });
    };

    return (
        <div>
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onRequestClose={() => setIsOpen(false)}
                    ariaHideApp={false}
                    className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white dark:bg-[#111] border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-md text-black dark:text-white"
                >
                    <div className="p-4">
                        <div className="border-b border-gray-200 dark:border-gray-700 py-2 px-1.5">
                            <HiX className="text-2xl text-gray-700 dark:text-gray-300 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer" onClick={() => setIsOpen(false)} />
                        </div>
                        <div className="p-2 flex items-center space-x-1 relative">
                            <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300 dark:bg-gray-600"></span>
                            <img src={post?.profileImg} alt="user-img" className="h-11 w-11 rounded-full mr-4" />
                            <h4 className="font-bold sm:text-[16px] text-[15px] truncate hover:underline">{post?.name}</h4>
                            <span className="text-sm sm:text-[15px] truncate text-gray-500 dark:text-gray-400">@{post?.username}</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-[15px] sm:text-[16px] ml-16 mb-2">{post?.text}</p>
                        <div className="flex p-3 space-x-3">
                            <img src={session.user.image} alt="user-img" className="h-11 w-11 rounded-full mr-4 cursor-pointer hover:brightness-95" />
                            <div className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <div>
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 dark:text-gray-200 dark:bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                        placeholder="Write your comment..."
                                        rows="2"
                                    />
                                </div>
                                <div className="flex items-center justify-end pt-2.5">
                                    <button
                                        onClick={sendComment}
                                        disabled={input.trim().length === 0}
                                        className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CommentModal;
