'use client'

import teamData from '@/data/team.json'
import Card from '@/components/Card'
import { useState } from 'react'

interface TeamMember {
  id: string
  name: string
  role: string
  title?: string
  interests: string[]
  bio: string
  email: string
  links?: {
    website?: string
    scholar?: string
    github?: string
  }
  image?: string
}

// Combine all team members into one list
const allMembers: TeamMember[] = [
  ...(teamData.faculty as TeamMember[]),
  ...(teamData.phd as TeamMember[]),
  ...(teamData.masters as TeamMember[]),
  ...(teamData.undergrad as TeamMember[]),
  ...(teamData.alumni as TeamMember[]),
]

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false)
  
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const showImage = member.image && !imageError

  // Filter out placeholder text
  const bio = member.bio && member.bio !== 'filler text' ? member.bio : ''
  const title = member.title && member.title !== 'filler text' ? member.title : ''
  const interests = member.interests.filter(i => i !== 'filler text')

  return (
    <Card>
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
          {showImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-3xl font-bold">
              {initials}
            </div>
          )}
        </div>
        <h3 className="font-semibold text-xl mb-1 text-slate-900">{member.name}</h3>
        {title && (
          <p className="text-sm text-primary font-medium mb-2">{title}</p>
        )}
        {bio && (
          <p className="text-sm text-slate-600 mb-4">{bio}</p>
        )}
        {interests.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {interests.map((interest) => (
              <span
                key={interest}
                className="text-xs text-slate-500 bg-sage-50 px-2 py-1 rounded"
              >
                {interest}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-center gap-4 text-sm">
          {member.email && member.email !== 'filler text' && (
            <a
              href={`mailto:${member.email}`}
              className="text-primary hover:text-primary-dark"
              aria-label={`Email ${member.name}`}
            >
              Email
            </a>
          )}
          {member.links?.website && (
            <a
              href={member.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark"
            >
              Website
            </a>
          )}
          {member.links?.scholar && (
            <a
              href={member.links.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark"
            >
              Scholar
            </a>
          )}
          {member.links?.github && (
            <a
              href={member.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function TeamPage() {
  return (
    <div>
      {/* Banner */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white py-20">
        <div className="container-custom text-center">
          <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4">
            Our Team
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Meet the researchers and collaborators driving innovation in human-centered AI.
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="container-custom py-16">
        {allMembers.length === 0 ? (
          <p className="text-center text-slate-500">No team members yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
