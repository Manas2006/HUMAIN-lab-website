import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Card from '@/components/Card'
import Button from '@/components/Button'
import { getAllPublications } from '@/lib/publications'
import { getAllPosts } from '@/lib/blog'
import teamData from '@/data/team.json'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const publications = getAllPublications()
  const blogPosts = getAllPosts()
  const totalTeamMembers =
    teamData.faculty.length +
    teamData.phd.length +
    teamData.masters.length +
    teamData.undergrad.length +
    teamData.alumni.length

  return (
    <div className="container-custom py-16">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-slate-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-600">Manage your website content</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Publications</p>
              <p className="text-3xl font-bold text-slate-900">{publications.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Blog Posts</p>
              <p className="text-3xl font-bold text-slate-900">{blogPosts.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 mb-1">Team Members</p>
              <p className="text-3xl font-bold text-slate-900">{totalTeamMembers}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card padding="lg">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-4">
            Publications
          </h2>
          <p className="text-slate-600 text-sm mb-4">
            Manage research publications and papers
          </p>
          <div className="space-y-2">
            <Link href="/admin/publications" className="block">
              <Button className="w-full">Manage Publications</Button>
            </Link>
            <Link href="/admin/publications/new" className="block">
              <Button variant="outline" className="w-full">
                Add New Publication
              </Button>
            </Link>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Blog</h2>
          <p className="text-slate-600 text-sm mb-4">
            Create and edit blog posts
          </p>
          <div className="space-y-2">
            <Link href="/admin/blog" className="block">
              <Button className="w-full">Manage Blog Posts</Button>
            </Link>
            <Link href="/admin/blog/new" className="block">
              <Button variant="outline" className="w-full">
                Create New Post
              </Button>
            </Link>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Team</h2>
          <p className="text-slate-600 text-sm mb-4">
            Manage team members and researchers
          </p>
          <div className="space-y-2">
            <Link href="/admin/team" className="block">
              <Button className="w-full">Manage Team</Button>
            </Link>
            <Link href="/admin/team/new" className="block">
              <Button variant="outline" className="w-full">
                Add Team Member
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

