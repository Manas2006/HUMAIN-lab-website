'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import content from '@/data/content.json'

const footerLinks = {
  research: [
    { href: '/research', label: 'Research Areas' },
    { href: '/publications', label: 'Publications' },
  ],
  about: [
    { href: '/team', label: 'Team' },
    { href: '/blog', label: 'Blog' },
  ],
  connect: [
    { href: '/contact', label: 'Contact' },
  ],
}

export default function Footer() {
  const pathname = usePathname()
  const [copied, setCopied] = useState(false)
  
  // Don't show footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(content.footer.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format email for display
  const displayEmail = content.footer.email.replace('@', '[at]')

  return (
    <footer className="bg-white border-t border-sage-200 mt-8">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Lab Info */}
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold text-primary-dark mb-4">
              HUMAIN Lab
            </h3>
            <p className="text-slate-600 mb-4 max-w-md">
              {content.footer.tagline}
            </p>
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                <strong>Email:</strong>{' '}
                <button 
                  onClick={handleCopyEmail}
                  className="hover:text-primary cursor-pointer"
                  title="Click to copy"
                >
                  {displayEmail}
                  {copied && <span className="ml-2 text-primary text-xs">(Copied!)</span>}
                </button>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Research</h4>
            <ul className="space-y-2">
              {footerLinks.research.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-sage-200 text-center text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} HUMAIN Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
