import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AdminBar } from '@/components/Layout/AdminBar'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LightLives - Empowering Children's Futures",
  description: "With essential life skills and values for a brighter tomorrow through innovative education programs.",
  keywords: "child education, life skills, mentorship, youth development, values, morals, faith, leadership, LightLives, non-profit, NGO, India",
  twitter: {
    card: "summary_large_image",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
      {/* <AdminBar /> */}
      <Navbar />
      <main data-vaul-drawer-wrapper>
        {children}
        <SpeedInsights />
      </main>
      <Footer />
      </body>
    </html>
  );
}
// ! AdminBar will ping the server on every page load to check auth status. Might deplete serverless function limits on Vercel if left in place on high traffic pages.


