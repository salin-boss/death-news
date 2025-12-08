import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FallingLasers from "@/components/FallingLasers";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEATH.NEWS",
  description: "All the news that's fit to dread",
  metadataBase: new URL("https://death.news"),
  openGraph: {
    title: "DEATH.NEWS",
    description: "All the news that's fit to dread",
    url: "https://death.news",
    siteName: "DEATH.NEWS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEATH.NEWS",
    description: "All the news that's fit to dread",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
      >
        <CustomCursor />
        <FallingLasers />
        <Header />
        <main className="max-w-5xl mx-auto px-8 py-8 relative z-10">{children}</main>
      </body>
    </html>
  );
}
