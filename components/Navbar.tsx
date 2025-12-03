"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Session } from 'next-auth'

export function Navbar({ session }: { session: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
            addfame
          </Link>
          {session?.user && (
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-primary transition-colors">
                Discover
              </Link>
              <Link href="/favorites" className="hover:text-primary transition-colors">
                Favorites
              </Link>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {!session?.user ? (
              <>
                <Link 
                  href="/login" 
                  className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  href="/register" 
                  className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-4">
            {session?.user && (
              <>
                <Link 
                  href="/" 
                  className="text-base font-medium text-gray-600 hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Discover
                </Link>
                <Link 
                  href="/favorites" 
                  className="text-base font-medium text-gray-600 hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Favorites
                </Link>
                <div className="h-px bg-gray-100 my-1" />
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">
                    {session.user.name || session.user.email}
                  </span>
                </div>
                <form action="/api/auth/signout" method="post">
                  <button 
                    className="w-full text-center text-sm font-medium border border-gray-200 bg-white px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all" 
                    type="submit"
                  >
                    Log out
                  </button>
                </form>
              </>
            )}
            {!session?.user && (
              <div className="flex flex-col gap-3">
                <Link 
                  href="/login" 
                  className="w-full text-center text-base font-medium text-gray-600 hover:text-primary py-2 border border-gray-200 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  href="/register" 
                  className="w-full text-center text-base font-medium bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary/90 shadow-sm shadow-primary/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
