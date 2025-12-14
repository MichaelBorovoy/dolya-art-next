import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import SocialSidebar from "@/components/SocialSidebar";
import Providers from "./api/auth/[...nextauth]/providers";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Olya Didenko",
  description: "It is my personal works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body>
        <Providers>
          <Header/>
          <SocialSidebar/>
          <div className="container pt-16 md:pt-20">
            {children}
            <Analytics/>
          </div>
        </Providers>
      </body>
    </html>
  );
}
