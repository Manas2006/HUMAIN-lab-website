import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextRequest, NextResponse } from 'next/server'
import { commitFile, isGitHubConfigured } from '@/lib/github'
import fs from 'fs'
import path from 'path'

async function isAuthenticated() {
  const session = await getServerSession(authOptions)
  return !!session
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const memberName = formData.get('memberName') as string || 'member'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be less than 2MB' }, { status: 400 })
    }

    // Generate filename from member name
    const slug = memberName
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    const extension = file.type.split('/')[1] || 'jpg'
    const filename = `${slug}-${Date.now()}.${extension}`
    const imagePath = `public/team/${filename}`

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    if (isGitHubConfigured()) {
      // Upload to GitHub
      const base64Content = buffer.toString('base64')
      
      // Use GitHub API directly for binary files
      const token = process.env.GITHUB_TOKEN
      const owner = process.env.GITHUB_OWNER
      const repo = process.env.GITHUB_REPO
      const branch = process.env.GITHUB_BRANCH || 'main'

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${imagePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Add team photo: ${memberName}`,
            content: base64Content,
            branch,
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        console.error('GitHub API error:', error)
        return NextResponse.json({ error: 'Failed to upload image to GitHub' }, { status: 500 })
      }

      // Return the public URL
      return NextResponse.json({ url: `/team/${filename}` })
    } else {
      // Save locally for development
      const publicDir = path.join(process.cwd(), 'public', 'team')
      
      // Create directory if it doesn't exist
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true })
      }

      const filePath = path.join(publicDir, filename)
      fs.writeFileSync(filePath, buffer)

      return NextResponse.json({ url: `/team/${filename}` })
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}

