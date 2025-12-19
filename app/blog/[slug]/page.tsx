import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import Card from '@/components/Card'
import { MDXContent } from '@/components/MDXContent'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container-custom py-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="text-sm text-slate-500 mb-4">
            {formatDate(post.publishedAt)}
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {post.title}
          </h1>
          {post.authors && post.authors.length > 0 && (
            <p className="text-lg text-slate-600 mb-4">
              By {post.authors.join(', ')}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-primary bg-sage-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {post.link && (
            <div className="mt-4">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
              >
                <span>View External Resource</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>

        <Card padding="lg" className="prose prose-slate max-w-none">
          <div className="mdx-content">
            <MDXContent content={post.content} />
          </div>
        </Card>
      </div>
    </article>
  )
}

