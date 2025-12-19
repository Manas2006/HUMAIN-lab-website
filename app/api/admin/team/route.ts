import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { commitFile, getFileContent, isGitHubConfigured } from '@/lib/github'
import fs from 'fs'
import path from 'path'

const TEAM_PATH = 'data/team.json'

async function isAuthenticated() {
  const session = await getServerSession(authOptions)
  return !!session
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Try to get from GitHub first (if configured)
    if (isGitHubConfigured()) {
      const githubContent = await getFileContent(TEAM_PATH)
      if (githubContent) {
        const team = JSON.parse(githubContent)
        return NextResponse.json(team)
      }
    }

    // Fallback to local file
    const teamPath = path.join(process.cwd(), TEAM_PATH)
    const data = fs.readFileSync(teamPath, 'utf8')
    const team = JSON.parse(data)
    return NextResponse.json(team)
  } catch (error) {
    console.error('Error reading team:', error)
    return NextResponse.json({ error: 'Failed to read team data' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const team = await request.json()
    const content = JSON.stringify(team, null, 2)

    // Try to commit to GitHub if configured
    if (isGitHubConfigured()) {
      await commitFile({
        path: TEAM_PATH,
        content,
        message: 'Update team data',
      })
    } else {
      // Fallback to local file write (for development)
      const teamPath = path.join(process.cwd(), TEAM_PATH)
      fs.writeFileSync(teamPath, content)
    }

    return NextResponse.json({ success: true, team })
  } catch (error) {
    console.error('Error updating team:', error)
    return NextResponse.json({ error: 'Failed to update team' }, { status: 500 })
  }
}
