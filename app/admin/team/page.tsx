'use client'

import { useState, useEffect } from 'react'
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

export default function TeamAdminPage() {
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
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

  // Get all members as a flat list
  const getAllMembers = (): TeamMember[] => {
    if (!teamData) return []
    return [
      ...teamData.faculty,
      ...teamData.phd,
      ...teamData.masters,
      ...teamData.undergrad,
      ...teamData.alumni,
    ]
  }

  // Find which category a member belongs to
  const findMemberCategory = (memberId: string): string | null => {
    if (!teamData) return null
    const categories = ['faculty', 'phd', 'masters', 'undergrad', 'alumni'] as const
    for (const cat of categories) {
      if (teamData[cat].some(m => m.id === memberId)) {
        return cat
      }
    }
    return null
  }

  const handleAddMember = () => {
    const newMember: TeamMember = {
      id: String(Date.now()),
      name: '',
      role: '',
      title: '',
      interests: [],
      bio: '',
      email: '',
    }
    setEditingMember(newMember)
  }

  const handleEditMember = (member: TeamMember) => {
    setEditingMember({ ...member })
  }

  const handleDeleteMember = async (memberId: string) => {
    if (!teamData || !confirm('Are you sure you want to delete this team member?')) return

    const category = findMemberCategory(memberId)
    if (!category) return

    const updatedTeamData = {
      ...teamData,
      [category]: teamData[category as keyof TeamData].filter(m => m.id !== memberId),
    }

    setTeamData(updatedTeamData)

    // Auto-save to GitHub
    setIsSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTeamData),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Team member deleted! Changes will be live after deployment (~1-2 min).' })
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

  const handleSaveMember = async () => {
    if (!teamData || !editingMember) return

    // Check if this is an existing member or new
    const existingCategory = findMemberCategory(editingMember.id)
    
    let updatedTeamData: TeamData

    if (existingCategory) {
      // Update existing member
      updatedTeamData = {
        ...teamData,
        [existingCategory]: teamData[existingCategory as keyof TeamData].map(m =>
          m.id === editingMember.id ? editingMember : m
        ),
      }
    } else {
      // Add new member to 'phd' array (default storage)
      updatedTeamData = {
        ...teamData,
        phd: [...teamData.phd, editingMember],
      }
    }

    setTeamData(updatedTeamData)
    setEditingMember(null)

    // Auto-save to GitHub
    setIsSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTeamData),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Team member saved! Changes will be live after deployment (~1-2 min).' })
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

  const allMembers = getAllMembers()

  return (
    <div className="container-custom py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900 mb-2">
            Manage Team
          </h1>
          <p className="text-slate-600">
            {allMembers.length} team member{allMembers.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={handleAddMember}>
          Add Team Member
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
              {findMemberCategory(editingMember.id) ? 'Edit Team Member' : 'Add Team Member'}
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Title/Role</label>
                <input
                  type="text"
                  value={editingMember.title || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, title: e.target.value })}
                  placeholder="e.g., PhD Student, Assistant Professor"
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="text"
                  value={editingMember.email}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                  placeholder="email[at]utexas.edu"
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
                  value={editingMember.interests.filter(i => i !== 'filler text').join(', ')}
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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
              <Button onClick={handleSaveMember} disabled={isSaving}>
                {isSaving ? 'Saving...' : (findMemberCategory(editingMember.id) ? 'Update Member' : 'Add Member')}
              </Button>
              <Button variant="outline" onClick={() => setEditingMember(null)}>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Team Members List */}
      <Card padding="lg">
        {allMembers.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No team members yet. Add your first one!</p>
        ) : (
          <div className="space-y-3">
            {allMembers.map((member) => {
              const initials = member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
              
              const displayTitle = member.title && member.title !== 'filler text' ? member.title : ''
              const displayEmail = member.email && member.email !== 'filler text' ? member.email : ''
              
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-sage-50 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    {member.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                          const next = (e.target as HTMLImageElement).nextElementSibling
                          if (next) next.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-sm font-bold ${member.image ? 'hidden' : ''}`}>
                      {initials}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{member.name}</p>
                      {displayTitle && (
                        <p className="text-sm text-slate-600">{displayTitle}</p>
                      )}
                      {displayEmail && (
                        <p className="text-sm text-slate-500">{displayEmail}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditMember(member)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteMember(member.id)}
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
    </div>
  )
}
