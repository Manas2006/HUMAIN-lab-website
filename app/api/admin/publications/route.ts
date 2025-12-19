import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { commitFile, deleteFile, getFileContent, isGitHubConfigured } from '@/lib/github'
import type { Publication } from '@/lib/publications'
import fs from 'fs'
import path from 'path'

const PUBLICATIONS_PATH = 'data/publications.json'

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
      const githubContent = await getFileContent(PUBLICATIONS_PATH)
      if (githubContent) {
        const publications = JSON.parse(githubContent)
        return NextResponse.json(publications)
      }
    }

    // Fallback to local file
    const publicationsPath = path.join(process.cwd(), PUBLICATIONS_PATH)
    const data = fs.readFileSync(publicationsPath, 'utf8')
    const publications = JSON.parse(data)
    return NextResponse.json(publications)
  } catch (error) {
    console.error('Error reading publications:', error)
    return NextResponse.json({ error: 'Failed to read publications' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const publication: Publication = await request.json()

    // Read existing publications
    let publications: Publication[] = []
    
    if (isGitHubConfigured()) {
      const githubContent = await getFileContent(PUBLICATIONS_PATH)
      if (githubContent) {
        publications = JSON.parse(githubContent)
      }
    }
    
    if (publications.length === 0) {
      // Fallback to local file
      const publicationsPath = path.join(process.cwd(), PUBLICATIONS_PATH)
      const data = fs.readFileSync(publicationsPath, 'utf8')
      publications = JSON.parse(data)
    }

    // Generate new ID if not provided
    if (!publication.id) {
      const maxId = Math.max(
        ...publications.map((p) => parseInt(p.id || '0')),
        0
      )
      publication.id = String(maxId + 1)
    }

    // Add new publication
    publications.push(publication)

    // Save to GitHub or local file
    const content = JSON.stringify(publications, null, 2)
    if (isGitHubConfigured()) {
      await commitFile({
        path: PUBLICATIONS_PATH,
        content,
        message: `Add publication: ${publication.title}`,
      })
    } else {
      const publicationsPath = path.join(process.cwd(), PUBLICATIONS_PATH)
      fs.writeFileSync(publicationsPath, content)
    }

    return NextResponse.json({ success: true, publication })
  } catch (error) {
    console.error('Error creating publication:', error)
    return NextResponse.json(
      { error: 'Failed to create publication' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const publication: Publication = await request.json()

    if (!publication.id) {
      return NextResponse.json({ error: 'Publication ID required' }, { status: 400 })
    }

    // Read existing publications
    let publications: Publication[] = []
    
    if (isGitHubConfigured()) {
      const githubContent = await getFileContent(PUBLICATIONS_PATH)
      if (githubContent) {
        publications = JSON.parse(githubContent)
      }
    }
    
    if (publications.length === 0) {
      const publicationsPath = path.join(process.cwd(), PUBLICATIONS_PATH)
      const data = fs.readFileSync(publicationsPath, 'utf8')
      publications = JSON.parse(data)
    }

    // Find and update
    const index = publications.findIndex((p) => p.id === publication.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Publication not found' }, { status: 404 })
    }

    publications[index] = publication

    // Save to GitHub or local file
    const content = JSON.stringify(publications, null, 2)
    if (isGitHubConfigured()) {
      await commitFile({
        path: PUBLICATIONS_PATH,
        content,
        message: `Update publication: ${publication.title}`,
      })
    } else {
      const publicationsPath = path.join(process.cwd(), PUBLICATIONS_PATH)
      fs.writeFileSync(publicationsPath, content)
    }

    return NextResponse.json({ success: true, publication })
  } catch (error) {
    console.error('Error updating publication:', error)
    return NextResponse.json(
      { error: 'Failed to update publication' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Publication ID required' }, { status: 400 })
    }

    // Read existing publications
    let publications: Publication[] = []
    
    if (isGitHubConfigured()) {
      const githubContent = await getFileContent(PUBLICATIONS_PATH)
      if (githubContent) {
        publications = JSON.parse(githubContent)
      }
    }
    
    if (publications.length === 0) {
      const publicationsPath = path.join(process.cwd(), PUBLICATIONS_PATH)
      const data = fs.readFileSync(publicationsPath, 'utf8')
      publications = JSON.parse(data)
    }

    // Find publication to delete (for commit message)
    const publication = publications.find((p) => p.id === id)

    // Filter out the publication
    const filtered = publications.filter((p) => p.id !== id)

    // Save to GitHub or local file
    const content = JSON.stringify(filtered, null, 2)
    if (isGitHubConfigured()) {
      await commitFile({
        path: PUBLICATIONS_PATH,
        content,
        message: `Delete publication: ${publication?.title || id}`,
      })
    } else {
      const publicationsPath = path.join(process.cwd(), PUBLICATIONS_PATH)
      fs.writeFileSync(publicationsPath, content)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting publication:', error)
    return NextResponse.json(
      { error: 'Failed to delete publication' },
      { status: 500 }
    )
  }
}
