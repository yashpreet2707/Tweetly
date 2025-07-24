"use client";

import { ModalProvider } from "@/app/context/MyContext";
import { SidebarProvider } from "@/app/context/SidebarContext";
import { SessionProvider } from "next-auth/react";


const SessionWrapper = ({ children }) => {
    return <SessionProvider>
        <ModalProvider>
            <SidebarProvider>
                {children}
            </SidebarProvider>
        </ModalProvider>
    </SessionProvider>
}

export default SessionWrapper;