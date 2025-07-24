import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";
import SessionWrapper from "@/components/SessionWrapper";
import CommentModal from "@/components/CommentModal";
import { ThemeProvider } from "@/lib/ThemeProvider";

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
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black dark:bg-black dark:text-white`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex justify-between max-w-7xl mx-auto">
              {/* Sidebar */}
              <div className="hidden sm:inline border-r dark:border-gray-800 h-screen sticky top-0">
                <Sidebar />
              </div>

              {/* Main content */}
              <div className="flex-1 w-2xl">{children}</div>

              {/* Right section (News + Search) */}
              <div className="lg:flex-col p-3 h-screen border-l dark:border-gray-800 hidden lg:flex w-[24rem] sticky top-0">
                <div className="bg-white dark:bg-black py-2 sticky top-0">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl text-sm w-full px-4 py-2 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <News />
              </div>
            </div>
            <CommentModal />
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
