'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Link from 'next/link'
import type { Publication } from '@/lib/publications'

export default function PublicationsAdminPage() {
  const router = useRouter()
  const [publications, setPublications] = useState<Publication[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPublications()
  }, [])

  const fetchPublications = async () => {
    try {
      const res = await fetch('/api/admin/publications')
      if (res.ok) {
        const data = await res.json()
        setPublications(data)
      }
    } catch (error) {
      console.error('Failed to fetch publications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this publication?')) {
      return
    }

    try {
      const res = await fetch(`/api/admin/publications?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchPublications()
      } else {
        alert('Failed to delete publication')
      }
    } catch (error) {
      alert('Failed to delete publication')
    }
  }

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <p className="text-slate-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container-custom py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900 mb-2">
            Manage Publications
          </h1>
          <p className="text-slate-600">
            {publications.length} publication{publications.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/admin/publications/new">
          <Button>Add New Publication</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {publications.length === 0 ? (
          <Card>
            <p className="text-center text-slate-600 py-8">
              No publications yet. Add your first one!
            </p>
          </Card>
        ) : (
          publications.map((pub) => (
            <Card key={pub.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-primary bg-sage-100 px-2 py-1 rounded-full">
                      {pub.type}
                    </span>
                    <span className="text-sm text-slate-500">{pub.year}</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-slate-900">
                    {pub.title}
                  </h3>
                  <p className="text-slate-600 mb-2">{pub.authors.join(', ')}</p>
                  <p className="text-sm text-slate-600">{pub.venue}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/admin/publications/${pub.id}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(pub.id)}
                    className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

