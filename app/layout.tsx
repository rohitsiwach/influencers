import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Addfame Influencers",
  description: "Discover and manage your favorite influencers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full bg-gray-50 text-gray-900`}
      >
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                Addfame
              </Link>
              {session?.user && (
                <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                  <Link href="/" className="hover:text-black transition-colors">
                    Discover
                  </Link>
                  <Link href="/favorites" className="hover:text-black transition-colors">
                    Favorites
                  </Link>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {!session?.user ? (
                <>
                  <Link 
                    href="/login" 
                    className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/register" 
                    className="text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 hidden sm:inline-block">
                    {session.user.name || session.user.email}
                  </span>
                  <form action="/api/auth/signout" method="post">
                    <button 
                      className="text-sm font-medium border border-gray-200 bg-white px-4 py-2 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all" 
                      type="submit"
                    >
                      Log out
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
