import BlogClient from './BlogClient'
import { getAllPosts, getUniqueTags } from '@/lib/blog'

export default function BlogPage() {
  const allPosts = getAllPosts()
  const tags = getUniqueTags()
  
  return <BlogClient initialPosts={allPosts} initialTags={tags} />
}
