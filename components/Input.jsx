'use client';
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { app } from '@/firebase';
import { getFirestore } from 'firebase/firestore';

const Input = () => {

    const { data: session } = useSession();

    const [image, setImage] = useState('');
    const [text, setText] = useState('')
    const [postLoading, setPostLoading] = useState(false);

    const db = getFirestore(app);

    const handlePost = async () => {
        setPostLoading(true);
        const docRef = await addDoc(collection(db, 'posts'), {
            uid: session.user.uid,
            username: session.user.username,
            name: session.user.name,
            text,
            image,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),
        })
        setPostLoading(false);
        setText('')
        setImage('');
        location.reload();
    }

    if (!session) return null;

    return (
        <div className="flex border-b border-gray-200 dark:border-gray-700 p-3 space-x-3">
            <img
                src={session.user.image}
                alt="user-img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
            />
            <div className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={2}
                    placeholder="What's happening..."
                    className="w-full border-none pb-2 outline-none tracking-wide min-h-[50px] bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                {image && <CldImage src={image} alt="uploaded-img" height={180} width={300} />}
                <div className="flex items-center justify-between py-2.5">
                    <CldUploadWidget
                        uploadPreset="random2707"
                        onSuccess={({ event, info }) => {
                            if (event === 'success') {
                                setImage(info.url);
                            }
                        }}
                    >
                        {({ open }) => (
                            <HiOutlinePhotograph
                                onClick={() => open()}
                                className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 dark:hover:bg-sky-900 rounded-full hover:cursor-pointer"
                            />
                        )}
                    </CldUploadWidget>
                    <button
                        disabled={text.trim() === '' || postLoading}
                        className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-105 disabled:opacity-50"
                        onClick={handlePost}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );


}

export default Input