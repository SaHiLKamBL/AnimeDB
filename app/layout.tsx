import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import Sessionwrapper from "./sessionw";
import { Dancing_Script, Michroma } from 'next/font/google'
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dancing',
})

const michroma = Michroma({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-michroma',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KaizokuDex",
  description: "Anime DataBase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} ${michroma.variable} antialiased`}
      >
       <main><Sessionwrapper>{children}</Sessionwrapper></main>
        <Toaster/>
      </body>
    </html>
  );
}
