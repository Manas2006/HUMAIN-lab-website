'use client'

import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Don't redirect if we're on the login page or still loading
    if (pathname === '/admin/login' || status === 'loading') {
      return
    }
    
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [pathname, status, router])

  // Show loading state while checking session (except on login page)
  if (status === 'loading' && pathname !== '/admin/login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-sage">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render admin content if not authenticated (except login page)
  if (status === 'unauthenticated' && pathname !== '/admin/login') {
    return null
  }

  // Render children directly - navbar is handled by root layout
  return <>{children}</>
}
