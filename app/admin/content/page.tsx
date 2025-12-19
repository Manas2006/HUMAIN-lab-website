'use client'

import { useState, useEffect } from 'react'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface ContentData {
  home: {
    hero: { title: string; tagline: string; description: string }
    about: { title: string; paragraph1: string; paragraph2: string }
    workLifeBalance: { title: string; description: string }
    prospectiveStudents: { title: string; description: string }
  }
  research: {
    header: { title: string; tagline: string; description: string }
    approach: { title: string; paragraph1: string; paragraph2: string }
    pillars: Array<{ title: string; description: string; highlight: string }>
    lookingForStudents: { title: string; description: string }
  }
  contact: {
    header: { title: string; description: string }
    prospectiveStudents: { title: string; description: string }
    contactInfo: { title: string; piName: string; email: string; location: string }
    researchInterests: { title: string; description: string }
  }
  team: {
    banner: { title: string; description: string }
  }
  footer: {
    tagline: string
    email: string
  }
}

export default function ContentAdminPage() {
  const [content, setContent] = useState<ContentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'home' | 'research' | 'contact' | 'team' | 'footer'>('home')

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/content')
      if (res.ok) {
        const data = await res.json()
        setContent(data)
      }
    } catch (error) {
      console.error('Failed to fetch content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!content) return

    setIsSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Content saved! Changes will be live after deployment (~1-2 min).' })
      } else {
        const error = await res.json()
        setMessage({ type: 'error', text: error.error || 'Failed to save content' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save content' })
    } finally {
      setIsSaving(false)
    }
  }

  const updateContent = (path: string, value: string) => {
    if (!content) return
    
    const keys = path.split('.')
    const newContent = JSON.parse(JSON.stringify(content))
    let obj: Record<string, unknown> = newContent
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (key.includes('[')) {
        const [arrKey, indexStr] = key.split('[')
        const index = parseInt(indexStr.replace(']', ''))
        obj = (obj[arrKey] as Record<string, unknown>[])[index] as Record<string, unknown>
      } else {
        obj = obj[key] as Record<string, unknown>
      }
    }
    
    obj[keys[keys.length - 1]] = value
    setContent(newContent)
  }

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <p className="text-slate-600">Loading...</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="container-custom py-16">
        <p className="text-red-600">Failed to load content</p>
      </div>
    )
  }

  const tabs = [
    { key: 'home', label: 'Home Page' },
    { key: 'research', label: 'Research Page' },
    { key: 'contact', label: 'Contact Page' },
    { key: 'team', label: 'Team Page' },
    { key: 'footer', label: 'Footer' },
  ] as const

  return (
    <div className="container-custom py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900 mb-2">
            Edit Site Content
          </h1>
          <p className="text-slate-600">
            Edit all text content across the website
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl text-sm ${
          message.type === 'success' ? 'bg-sage-100 text-primary' : 'bg-red-50 text-red-600'
        }`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? 'bg-primary text-white'
                : 'bg-sage-100 text-slate-600 hover:bg-sage-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Home Page Content */}
      {activeTab === 'home' && (
        <div className="space-y-6">
          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.home.hero.title}
                  onChange={(e) => updateContent('home.hero.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={content.home.hero.tagline}
                  onChange={(e) => updateContent('home.hero.tagline', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={content.home.hero.description}
                  onChange={(e) => updateContent('home.hero.description', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">About Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.home.about.title}
                  onChange={(e) => updateContent('home.about.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Paragraph 1</label>
                <textarea
                  rows={4}
                  value={content.home.about.paragraph1}
                  onChange={(e) => updateContent('home.about.paragraph1', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Paragraph 2</label>
                <textarea
                  rows={4}
                  value={content.home.about.paragraph2}
                  onChange={(e) => updateContent('home.about.paragraph2', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Work-Life Balance</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.home.workLifeBalance.title}
                  onChange={(e) => updateContent('home.workLifeBalance.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={content.home.workLifeBalance.description}
                  onChange={(e) => updateContent('home.workLifeBalance.description', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Prospective Students</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.home.prospectiveStudents.title}
                  onChange={(e) => updateContent('home.prospectiveStudents.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={content.home.prospectiveStudents.description}
                  onChange={(e) => updateContent('home.prospectiveStudents.description', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Research Page Content */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Header</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.research.header.title}
                  onChange={(e) => updateContent('research.header.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={content.research.header.tagline}
                  onChange={(e) => updateContent('research.header.tagline', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={content.research.header.description}
                  onChange={(e) => updateContent('research.header.description', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Our Approach</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.research.approach.title}
                  onChange={(e) => updateContent('research.approach.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Paragraph 1</label>
                <textarea
                  rows={4}
                  value={content.research.approach.paragraph1}
                  onChange={(e) => updateContent('research.approach.paragraph1', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Paragraph 2</label>
                <textarea
                  rows={4}
                  value={content.research.approach.paragraph2}
                  onChange={(e) => updateContent('research.approach.paragraph2', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          {content.research.pillars.map((pillar, index) => (
            <Card key={index} padding="lg">
              <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
                Research Pillar {index + 1}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => updateContent(`research.pillars[${index}].title`, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={pillar.description}
                    onChange={(e) => updateContent(`research.pillars[${index}].description`, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Highlight (optional)</label>
                  <textarea
                    rows={2}
                    value={pillar.highlight}
                    onChange={(e) => updateContent(`research.pillars[${index}].highlight`, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </Card>
          ))}

          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Looking for Students</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.research.lookingForStudents.title}
                  onChange={(e) => updateContent('research.lookingForStudents.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={content.research.lookingForStudents.description}
                  onChange={(e) => updateContent('research.lookingForStudents.description', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Contact Page Content */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Header</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.contact.header.title}
                  onChange={(e) => updateContent('contact.header.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  rows={2}
                  value={content.contact.header.description}
                  onChange={(e) => updateContent('contact.header.description', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Contact Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Section Title</label>
                <input
                  type="text"
                  value={content.contact.contactInfo.title}
                  onChange={(e) => updateContent('contact.contactInfo.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">PI Name</label>
                <input
                  type="text"
                  value={content.contact.contactInfo.piName}
                  onChange={(e) => updateContent('contact.contactInfo.piName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={content.contact.contactInfo.email}
                  onChange={(e) => updateContent('contact.contactInfo.email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <textarea
                  rows={2}
                  value={content.contact.contactInfo.location}
                  onChange={(e) => updateContent('contact.contactInfo.location', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Prospective Students</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.contact.prospectiveStudents.title}
                  onChange={(e) => updateContent('contact.prospectiveStudents.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={content.contact.prospectiveStudents.description}
                  onChange={(e) => updateContent('contact.prospectiveStudents.description', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Research Interests Box</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.contact.researchInterests.title}
                  onChange={(e) => updateContent('contact.researchInterests.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  value={content.contact.researchInterests.description}
                  onChange={(e) => updateContent('contact.researchInterests.description', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Team Page Content */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Banner</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.team.banner.title}
                  onChange={(e) => updateContent('team.banner.title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  rows={2}
                  value={content.team.banner.description}
                  onChange={(e) => updateContent('team.banner.description', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>
          <p className="text-sm text-slate-500">
            To edit team members, go to the <a href="/admin/team" className="text-primary hover:underline">Team Management</a> page.
          </p>
        </div>
      )}

      {/* Footer Content */}
      {activeTab === 'footer' && (
        <div className="space-y-6">
          <Card padding="lg">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Footer</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={content.footer.tagline}
                  onChange={(e) => updateContent('footer.tagline', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={content.footer.email}
                  onChange={(e) => updateContent('footer.email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

