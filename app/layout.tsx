import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import MainHeader from "@/components/main-header/main-header";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TechnoVerse",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased px-[8vw] pb-20",
          fontSans.variable
        )}
      >
        <Toaster position="top-right" />
        <MainHeader />
        <main className="mt-10">
        {children}
        </main>
      </body>
    </html>
  );
}
