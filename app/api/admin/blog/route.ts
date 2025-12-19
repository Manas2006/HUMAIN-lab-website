import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import { commitFile, deleteFile, isGitHubConfigured } from '@/lib/github'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'content/blog')

async function isAuthenticated() {
  const session = await getServerSession(authOptions)
  return !!session
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json([])
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const posts = fileNames
      .filter((name: string) => name.endsWith('.mdx'))
      .map((fileName: string) => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          slug,
          title: data.title,
          publishedAt: data.publishedAt || data.date,
          authors: data.authors || [],
          excerpt: data.excerpt || '',
          tags: data.tags || [],
          draft: data.draft || false,
        }
      })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return NextResponse.json({ error: 'Failed to read blog posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug, title, publishedAt, authors, excerpt, tags, content, draft } =
      await request.json()

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Slug, title, and content are required' },
        { status: 400 }
      )
    }

    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
publishedAt: "${publishedAt || new Date().toISOString().split('T')[0]}"
authors: ${JSON.stringify(authors || [])}
excerpt: "${(excerpt || '').replace(/"/g, '\\"')}"
tags: ${JSON.stringify(tags || [])}
${draft ? 'draft: true' : ''}
---

${content}`

    // Save to GitHub or local file
    if (isGitHubConfigured()) {
      await commitFile({
        path: `content/blog/${slug}.mdx`,
        content: frontmatter,
        message: `Add blog post: ${title}`,
      })
    } else {
      const filePath = path.join(postsDirectory, `${slug}.mdx`)
      fs.writeFileSync(filePath, frontmatter)
    }

    return NextResponse.json({ success: true, slug })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug, title, publishedAt, authors, excerpt, tags, content, draft, newSlug } =
      await request.json()

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: 'Slug, title, and content are required' },
        { status: 400 }
      )
    }

    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
publishedAt: "${publishedAt || new Date().toISOString().split('T')[0]}"
authors: ${JSON.stringify(authors || [])}
excerpt: "${(excerpt || '').replace(/"/g, '\\"')}"
tags: ${JSON.stringify(tags || [])}
${draft ? 'draft: true' : ''}
---

${content}`

    // Save to GitHub or local file
    if (isGitHubConfigured()) {
      // If slug changed, delete old file first
      if (newSlug && newSlug !== slug) {
        try {
          await deleteFile(`content/blog/${slug}.mdx`, `Rename blog post: ${slug} → ${newSlug}`)
        } catch (e) {
          // Old file might not exist, continue
        }
      }

      await commitFile({
        path: `content/blog/${newSlug || slug}.mdx`,
        content: frontmatter,
        message: `Update blog post: ${title}`,
      })
    } else {
      // Local file handling
      const oldFilePath = path.join(postsDirectory, `${slug}.mdx`)
      const newFilePath = path.join(postsDirectory, `${newSlug || slug}.mdx`)

      // If slug changed, delete old file
      if (newSlug && newSlug !== slug && fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath)
      }

      fs.writeFileSync(newFilePath, frontmatter)
    }

    return NextResponse.json({ success: true, slug: newSlug || slug })
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    // Delete from GitHub or local file
    if (isGitHubConfigured()) {
      await deleteFile(`content/blog/${slug}.mdx`, `Delete blog post: ${slug}`)
    } else {
      const filePath = path.join(postsDirectory, `${slug}.mdx`)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
