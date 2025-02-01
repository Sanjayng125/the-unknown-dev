import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "TheUnknownDev",
  description: "A portfolio of a typical web dev",
  creator: "Sanjay NG",
  keywords: [
    "Next JS",
    "React JS",
    "Tailwind CSS",
    "MongoDB",
    "Node JS",
    "Portfolio",
    "Sanjay NG",
    "TheUnknownDev",
    "Web Dev",
    "Web Dev Portfolio",
    "Sanjay Portfolio",
    "Sanjay NG Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-full bg-gray-950 dark flex justify-center">
        <SessionProvider>
          <div className="w-full max-w-[100rem] flex flex-col justify-between">
            <Navbar />
            <main className="w-full">{children}</main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
