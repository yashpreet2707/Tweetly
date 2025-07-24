import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";
import SessionWrapper from "@/components/SessionWrapper";
import CommentModal from "@/components/CommentModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tweetly",
  description:
    "A Next.js application that mimics the X (formerly Twitter) platform",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex justify-between max-w-7xl mx-auto">
            <div className="hidden sm:inline border-r h-screen sticky top-0">
              <Sidebar />
            </div>
            <div className="flex-1 w-2xl">{children}</div>
            <div className="lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem] sticky top-0">
              <div className="bg-white py-2 sticky top-0">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2"
                />
              </div>
              <News />
            </div>
          </div>
          <CommentModal />
        </body>
      </html>
    </SessionWrapper>
  );
}
