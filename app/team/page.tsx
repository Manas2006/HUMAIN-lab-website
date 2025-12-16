import teamData from '@/data/team.json'
import Card from '@/components/Card'
import Image from 'next/image'

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

const teamGroups = [
  { key: 'faculty', title: 'Faculty', members: teamData.faculty as TeamMember[] },
  { key: 'phd', title: 'PhD Students', members: teamData.phd as TeamMember[] },
  { key: 'masters', title: 'Master\'s Students', members: teamData.masters as TeamMember[] },
  { key: 'undergrad', title: 'Undergraduate Researchers', members: teamData.undergrad as TeamMember[] },
  { key: 'alumni', title: 'Alumni', members: teamData.alumni as TeamMember[] },
]

function TeamMemberCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <Card>
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-3xl font-bold">
          {initials}
        </div>
        <h3 className="font-semibold text-xl mb-1 text-slate-900">{member.name}</h3>
        {member.title && (
          <p className="text-sm text-primary font-medium mb-2">{member.title}</p>
        )}
        <p className="text-sm text-slate-600 mb-4">{member.bio}</p>
        {member.interests.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {member.interests.map((interest) => (
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
          <a
            href={`mailto:${member.email}`}
            className="text-primary hover:text-primary-dark"
            aria-label={`Email ${member.name}`}
          >
            Email
          </a>
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
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          Our Team
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Meet the researchers and collaborators driving innovation in human-centered AI.
        </p>
      </div>

      <div className="space-y-16">
        {teamGroups.map((group) => {
          if (group.members.length === 0) return null
          return (
            <div key={group.key}>
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">
                {group.title}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.members.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

