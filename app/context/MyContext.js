"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [commentPostId, setCommentPostId] = useState("");

  return (
    <ModalContext.Provider
      value={{ isOpen, setIsOpen, commentPostId, setCommentPostId }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
