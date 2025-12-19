'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Link from 'next/link'
import type { Publication } from '@/lib/publications'

export default function NewPublicationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<Publication>>({
    title: '',
    authors: [],
    venue: '',
    year: new Date().getFullYear().toString(),
    type: 'Conference',
    tags: [],
    abstract: '',
    links: {},
  })
  const [authorInput, setAuthorInput] = useState('')
  const [tagInput, setTagInput] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/admin/publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/publications')
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to create publication')
      }
    } catch (error) {
      alert('Failed to create publication')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addAuthor = () => {
    if (authorInput.trim()) {
      setFormData({
        ...formData,
        authors: [...(formData.authors || []), authorInput.trim()],
      })
      setAuthorInput('')
    }
  }

  const removeAuthor = (index: number) => {
    setFormData({
      ...formData,
      authors: formData.authors?.filter((_, i) => i !== index) || [],
    })
  }

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      })
      setTagInput('')
    }
  }

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((_, i) => i !== index) || [],
    })
  }

  return (
    <div className="container-custom py-16">
      <div className="mb-8">
        <Link href="/admin/publications" className="text-primary hover:text-primary-dark mb-4 inline-block">
          ← Back to Publications
        </Link>
        <h1 className="font-display text-4xl font-bold text-slate-900 mb-2">
          Add New Publication
        </h1>
      </div>

      <Card padding="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Authors *
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addAuthor()
                  }
                }}
                placeholder="Add author name"
                className="flex-1 px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="button" onClick={addAuthor}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.authors?.map((author, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-sage-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                >
                  {author}
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Venue *
              </label>
              <input
                type="text"
                required
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year *
              </label>
              <input
                type="text"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Type *
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Conference">Conference</option>
              <option value="Journal">Journal</option>
              <option value="Workshop">Workshop</option>
              <option value="Preprint">Preprint</option>
              <option value="Book">Book</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
                placeholder="Add tag"
                className="flex-1 px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="button" onClick={addTag}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-sage-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Abstract *
            </label>
            <textarea
              required
              rows={4}
              value={formData.abstract}
              onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                PDF Link
              </label>
              <input
                type="url"
                value={formData.links?.pdf || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    links: { ...formData.links, pdf: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                DOI Link
              </label>
              <input
                type="url"
                value={formData.links?.doi || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    links: { ...formData.links, doi: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Code Link
              </label>
              <input
                type="url"
                value={formData.links?.code || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    links: { ...formData.links, code: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Publication'}
            </Button>
            <Link href="/admin/publications">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

