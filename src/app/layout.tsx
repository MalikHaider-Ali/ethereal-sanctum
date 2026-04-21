import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/chatbot/chatbot";
import CustomCursor from "@/components/CustomCursor";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ethereal Sanctum | Serenova Med Spa",
  description:
    "A sanctuary where advanced medical science harmonizes with the ethereal art of rejuvenation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body
        className={`${newsreader.variable} ${inter.variable} font-body selection:bg-primary selection:text-on-primary`}
      >
        <CustomCursor />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}