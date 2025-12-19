import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

async function isAuthenticated() {
  const session = await getServerSession(authOptions)
  return !!session
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const filePath = path.join(postsDirectory, `${params.slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return NextResponse.json({
      slug: params.slug,
      title: data.title,
      publishedAt: data.publishedAt || data.date,
      authors: data.authors || [],
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      content,
      draft: data.draft || false,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read blog post' }, { status: 500 })
  }
}

