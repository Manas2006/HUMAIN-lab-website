'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Link from 'next/link'

interface BlogPost {
  slug: string
  title: string
  publishedAt: string
  authors: string[]
  excerpt: string
  tags: string[]
  draft: boolean
}

export default function BlogAdminPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog')
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Failed to fetch blog posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return
    }

    try {
      const res = await fetch(`/api/admin/blog?slug=${slug}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchPosts()
      } else {
        alert('Failed to delete blog post')
      }
    } catch (error) {
      alert('Failed to delete blog post')
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
            Manage Blog Posts
          </h1>
          <p className="text-slate-600">
            {posts.length} post{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button>Create New Post</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card>
            <p className="text-center text-slate-600 py-8">
              No blog posts yet. Create your first one!
            </p>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.slug}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {post.draft && (
                      <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                        Draft
                      </span>
                    )}
                    <span className="text-sm text-slate-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-xl mb-2 text-slate-900">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-2 line-clamp-2">{post.excerpt}</p>
                  {post.authors.length > 0 && (
                    <p className="text-sm text-slate-500">
                      By {post.authors.join(', ')}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/admin/blog/${post.slug}`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(post.slug)}
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

