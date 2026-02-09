import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "ERŠ LAN Party",
  description: "Uradna spletna stran ERŠ LAN Party dogodka",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#02040A] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
