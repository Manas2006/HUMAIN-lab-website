import BlogClient from './BlogClient'

export default function BlogPage() {
  return <BlogClient />
}
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('')

  const filteredPosts = useMemo(() => {
    let filtered = allPosts

    if (searchQuery) {
      filtered = searchPosts(searchQuery)
    }

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag))
    }

    return filtered
  }, [searchQuery, selectedTag])

  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          Blog
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          News, updates, and insights from our lab.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto mb-12 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-3.5 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === ''
                ? 'bg-primary text-white'
                : 'bg-sage-100 text-slate-700 hover:bg-sage-200'
            }`}
          >
            All Topics
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-primary text-white'
                  : 'bg-sage-100 text-slate-700 hover:bg-sage-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {filteredPosts.length !== allPosts.length && (
          <p className="text-sm text-slate-600">
            Showing {filteredPosts.length} of {allPosts.length} posts
          </p>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <Card>
          <p className="text-center text-slate-600 py-8">No posts found matching your filters.</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card>
                <div className="text-sm text-slate-500 mb-2">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <h2 className="font-semibold text-xl mb-2 text-slate-900 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
                {post.authors && post.authors.length > 0 && (
                  <p className="text-sm text-slate-500 mb-3">
                    By {post.authors.join(', ')}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-slate-500 bg-sage-50 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

