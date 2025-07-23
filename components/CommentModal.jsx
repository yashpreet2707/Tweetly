
'use client';
import { useModalContext } from "@/app/context/MyContext";
import React from "react";

const CommentModal = () => {
    const { isOpen } = useModalContext();


    return (
        <div>
            <h1>Comment modal</h1>
            {isOpen && <p>This is open now</p>}
        </div>
    )
}
export default CommentModal;