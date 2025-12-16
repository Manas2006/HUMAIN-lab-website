import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  publishedAt: string
  authors: string[]
  excerpt: string
  tags?: string[]
  coverImage?: string
  content: string
  draft?: boolean
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        publishedAt: data.publishedAt || data.date,
        authors: data.authors || [],
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        coverImage: data.coverImage,
        content,
        draft: data.draft || false,
      } as BlogPost
    })
    .filter((post) => !post.draft)
    .sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

  return allPosts
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title,
    publishedAt: data.publishedAt || data.date,
    authors: data.authors || [],
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    coverImage: data.coverImage,
    content,
    draft: data.draft || false,
  } as BlogPost
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  const posts = getAllPosts()
  return posts.slice(0, count)
}

export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts()
  const lowerQuery = query.toLowerCase()

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.authors.some((author) => author.toLowerCase().includes(lowerQuery)) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

export function getUniqueTags(): string[] {
  const posts = getAllPosts()
  const allTags = posts.flatMap((p) => p.tags || [])
  return Array.from(new Set(allTags)).sort()
}

