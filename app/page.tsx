import Link from 'next/link'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { getFeaturedPublications } from '@/lib/publications'
import { getRecentPosts } from '@/lib/blog'

export default async function Home() {
  const featuredPublications = await getFeaturedPublications(3)
  const recentPosts = await getRecentPosts(3)

  return (
    <>
      {/* Hero Section */}
      <section className="container-custom py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Advancing Human-Centered Artificial Intelligence
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Our research lab focuses on developing ethical AI systems that enhance human
              capabilities and create positive societal impact through innovative technology
              solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/research" size="lg">
                Explore Our Work
              </Button>
              <Button href="/blog" variant="outline" size="lg">
                Read the Blog
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-sage-100 aspect-square flex items-center justify-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/Smiling%20and%20Waving%20Logo%20Animation.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Research Areas
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We conduct cutting-edge research across multiple domains of artificial intelligence
            and human-computer interaction.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchAreas.map((area) => (
            <Card key={area.title}>
              <h3 className="font-semibold text-xl mb-2 text-slate-900">{area.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{area.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Publications */}
      <section className="container-custom py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Featured Publications
            </h2>
            <p className="text-slate-600">Our latest research contributions</p>
          </div>
          <Link
            href="/publications"
            className="text-primary hover:text-primary-dark font-medium hidden md:block"
          >
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPublications.map((pub) => (
            <Card key={pub.id}>
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-semibold text-primary bg-sage-100 px-2 py-1 rounded-full">
                  {pub.type}
                </span>
                <span className="text-sm text-slate-500">{pub.year}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 line-clamp-2">
                {pub.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">{pub.abstract}</p>
              <div className="flex flex-wrap gap-2">
                {pub.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-500 bg-sage-50 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/publications">
            <Button variant="outline">View all publications</Button>
          </Link>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="container-custom py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Latest from the Blog
            </h2>
            <p className="text-slate-600">News, updates, and insights from our lab</p>
          </div>
          <Link
            href="/blog"
            className="text-primary hover:text-primary-dark font-medium hidden md:block"
          >
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card>
                <div className="text-sm text-slate-500 mb-2">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-slate-900 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 2).map((tag) => (
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
        <div className="mt-8 text-center md:hidden">
          <Link href="/blog">
            <Button variant="outline">View all posts</Button>
          </Link>
        </div>
      </section>
    </>
  )
}

const researchAreas = [
  {
    title: 'Responsible AI',
    description:
      'Ensuring artificial intelligence systems are fair, transparent, and aligned with human values through rigorous ethical frameworks.',
  },
  {
    title: 'Human-AI Interaction',
    description:
      'Designing intuitive interfaces and interaction paradigms that make technology more accessible and user-friendly.',
  },
  {
    title: 'Evaluation + Safety',
    description:
      'Developing comprehensive evaluation methods that go beyond accuracy to assess safety, fairness, and societal impact.',
  },
  {
    title: 'Systems + Deployment',
    description:
      'Bridging the gap between research and real-world deployment, building robust AI systems for production environments.',
  },
]

