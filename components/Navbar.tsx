'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Button from './Button'

const publicNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/team', label: 'Team' },
  { href: '/blog', label: 'Blog' },
]

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/publications', label: 'Publications' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/team', label: 'Team' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()
  
  const isAdminRoute = pathname?.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'
  const isAuthenticated = status === 'authenticated'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Don't show navbar on login page
  if (isLoginPage) {
    return null
  }

  const navLinks = isAdminRoute && isAuthenticated ? adminNavLinks : publicNavLinks

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sage-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={isAdminRoute && isAuthenticated ? '/admin' : '/'} className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold text-primary-dark">
              {isAdminRoute && isAuthenticated ? 'HUMAIN Lab Admin' : 'HUMAIN Lab'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && link.href !== '/admin' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-slate-700 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAdminRoute && isAuthenticated ? (
              <>
                <Link
                  href="/"
                  className="text-sm text-slate-600 hover:text-primary"
                  target="_blank"
                >
                  View Site
                </Link>
                <Button size="sm" variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : isAuthenticated ? (
              <>
                <Link href="/admin">
                  <Button size="sm" variant="outline">Admin Panel</Button>
                </Link>
                <Link href="/contact">
                  <Button size="sm">Contact</Button>
                </Link>
              </>
            ) : (
              <Link href="/contact">
                <Button size="sm">Contact</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-sage-100 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-sage-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && link.href !== '/admin' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-sage-50'
                      : 'text-slate-700 hover:bg-sage-50 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="px-4 pt-2 space-y-2">
              {isAdminRoute && isAuthenticated ? (
                <>
                  <Link href="/" onClick={() => setIsOpen(false)} target="_blank">
                    <Button size="sm" variant="outline" className="w-full">View Site</Button>
                  </Link>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => { handleLogout(); setIsOpen(false); }}>
                    Logout
                  </Button>
                </>
              ) : isAuthenticated ? (
                <>
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    <Button size="sm" variant="outline" className="w-full">Admin Panel</Button>
                  </Link>
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full">Contact</Button>
                  </Link>
                </>
              ) : (
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="w-full">Contact</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
