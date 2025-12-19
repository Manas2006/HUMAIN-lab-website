'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'
import Button from '@/components/Button'

interface TeamMember {
  id: string
  name: string
  role: string
  title?: string
  interests: string[]
  bio: string
  email: string
  image?: string
  links?: {
    website?: string
    scholar?: string
    github?: string
  }
}

interface TeamData {
  faculty: TeamMember[]
  phd: TeamMember[]
  masters: TeamMember[]
  undergrad: TeamMember[]
  alumni: TeamMember[]
}

const categories = [
  { key: 'faculty', label: 'Faculty' },
  { key: 'phd', label: 'PhD Students' },
  { key: 'masters', label: "Master's Students" },
  { key: 'undergrad', label: 'Undergraduate Researchers' },
  { key: 'alumni', label: 'Alumni' },
]

export default function TeamAdminPage() {
  const router = useRouter()
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [editingCategory, setEditingCategory] = useState<string>('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  useEffect(() => {
    fetchTeamData()
  }, [])

  const fetchTeamData = async () => {
    try {
      const res = await fetch('/api/admin/team')
      if (res.ok) {
        const data = await res.json()
        setTeamData(data)
      }
    } catch (error) {
      console.error('Failed to fetch team data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!teamData) return

    setIsSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Team data saved successfully! Changes will be live after deployment (~1-2 min).' })
      } else {
        const error = await res.json()
        setMessage({ type: 'error', text: error.error || 'Failed to save team data' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save team data' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddMember = (category: string) => {
    const newMember: TeamMember = {
      id: String(Date.now()),
      name: '',
      role: categories.find(c => c.key === category)?.label || '',
      title: '',
      interests: [],
      bio: '',
      email: '',
    }
    setEditingMember(newMember)
    setEditingCategory(category)
  }

  const handleEditMember = (member: TeamMember, category: string) => {
    setEditingMember({ ...member })
    setEditingCategory(category)
  }

  const handleDeleteMember = (memberId: string, category: string) => {
    if (!teamData || !confirm('Are you sure you want to delete this team member?')) return

    setTeamData({
      ...teamData,
      [category]: (teamData[category as keyof TeamData] as TeamMember[]).filter(m => m.id !== memberId),
    })
  }

  const handleSaveMember = () => {
    if (!teamData || !editingMember || !editingCategory) return

    const categoryMembers = teamData[editingCategory as keyof TeamData] as TeamMember[]
    const existingIndex = categoryMembers.findIndex(m => m.id === editingMember.id)

    if (existingIndex >= 0) {
      categoryMembers[existingIndex] = editingMember
    } else {
      categoryMembers.push(editingMember)
    }

    setTeamData({
      ...teamData,
      [editingCategory]: categoryMembers,
    })

    setEditingMember(null)
    setEditingCategory('')
  }

  if (isLoading) {
    return (
      <div className="container-custom py-16">
        <p className="text-slate-600">Loading...</p>
      </div>
    )
  }

  if (!teamData) {
    return (
      <div className="container-custom py-16">
        <p className="text-red-600">Failed to load team data</p>
      </div>
    )
  }

  return (
    <div className="container-custom py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900 mb-2">
            Manage Team
          </h1>
          <p className="text-slate-600">
            Add, edit, or remove team members
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

      {/* Edit Modal */}
      {editingMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card padding="lg" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
              {editingMember.name ? 'Edit Team Member' : 'Add Team Member'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingMember.title || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, title: e.target.value })}
                  placeholder="e.g., Assistant Professor"
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                <textarea
                  rows={3}
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Research Interests (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingMember.interests.join(', ')}
                  onChange={(e) => setEditingMember({
                    ...editingMember,
                    interests: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
                  })}
                  placeholder="e.g., Machine Learning, NLP, Ethics"
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Profile Picture
                </label>
                <div className="space-y-3">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        
                        // Check file size (max 2MB)
                        if (file.size > 2 * 1024 * 1024) {
                          alert('Image must be less than 2MB')
                          return
                        }
                        
                        setIsUploadingImage(true)
                        try {
                          const formData = new FormData()
                          formData.append('file', file)
                          formData.append('memberId', editingMember.id)
                          formData.append('memberName', editingMember.name || 'member')
                          
                          const res = await fetch('/api/admin/upload-image', {
                            method: 'POST',
                            body: formData,
                          })
                          
                          if (res.ok) {
                            const { url } = await res.json()
                            setEditingMember({ ...editingMember, image: url })
                          } else {
                            const error = await res.json()
                            alert(error.error || 'Failed to upload image')
                          }
                        } catch (error) {
                          alert('Failed to upload image')
                        } finally {
                          setIsUploadingImage(false)
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                    />
                    {isUploadingImage && (
                      <p className="text-sm text-primary mt-2">Uploading...</p>
                    )}
                  </div>
                  
                  <div className="text-xs text-slate-500">— or paste an image URL —</div>
                  
                  <input
                    type="url"
                    value={editingMember.image || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                {editingMember.image && (
                  <div className="mt-3">
                    <p className="text-xs text-slate-500 mb-2">Preview:</p>
                    <img
                      src={editingMember.image}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-sage-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={editingMember.links?.website || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      links: { ...editingMember.links, website: e.target.value },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Google Scholar</label>
                  <input
                    type="url"
                    value={editingMember.links?.scholar || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      links: { ...editingMember.links, scholar: e.target.value },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">GitHub</label>
                  <input
                    type="url"
                    value={editingMember.links?.github || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      links: { ...editingMember.links, github: e.target.value },
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button onClick={handleSaveMember}>
                {editingMember.name ? 'Update Member' : 'Add Member'}
              </Button>
              <Button variant="outline" onClick={() => { setEditingMember(null); setEditingCategory(''); }}>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Team Categories */}
      <div className="space-y-8">
        {categories.map(({ key, label }) => {
          const members = teamData[key as keyof TeamData] as TeamMember[]
          return (
            <Card key={key} padding="lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-slate-900">
                  {label} ({members.length})
                </h2>
                <Button size="sm" onClick={() => handleAddMember(key)}>
                  Add {label.replace(/s$/, '')}
                </Button>
              </div>

              {members.length === 0 ? (
                <p className="text-slate-500 text-sm">No {label.toLowerCase()} yet</p>
              ) : (
                <div className="space-y-3">
                  {members.map((member) => {
                    const initials = member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                    
                    return (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 bg-sage-50 rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none'
                                ;(e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden')
                              }}
                            />
                          ) : null}
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-sm font-bold ${member.image ? 'hidden' : ''}`}>
                            {initials}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{member.name}</p>
                            {member.title && member.title !== 'filler text' && (
                              <p className="text-sm text-slate-600">{member.title}</p>
                            )}
                            <p className="text-sm text-slate-500">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditMember(member, key)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteMember(member.id, key)}
                            className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

