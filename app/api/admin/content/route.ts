import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { commitFile, getFileContent, isGitHubConfigured } from '@/lib/github'
import fs from 'fs'
import path from 'path'

const CONTENT_PATH = 'data/content.json'

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
      const githubContent = await getFileContent(CONTENT_PATH)
      if (githubContent) {
        const content = JSON.parse(githubContent)
        return NextResponse.json(content)
      }
    }

    // Fallback to local file
    const contentPath = path.join(process.cwd(), CONTENT_PATH)
    const data = fs.readFileSync(contentPath, 'utf8')
    const content = JSON.parse(data)
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error reading content:', error)
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const content = await request.json()
    const jsonContent = JSON.stringify(content, null, 2)

    // Try to commit to GitHub if configured
    if (isGitHubConfigured()) {
      await commitFile({
        path: CONTENT_PATH,
        content: jsonContent,
        message: 'Update site content',
      })
    } else {
      // Fallback to local file write (for development)
      const contentPath = path.join(process.cwd(), CONTENT_PATH)
      fs.writeFileSync(contentPath, jsonContent)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}

