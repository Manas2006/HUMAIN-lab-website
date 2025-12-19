import Link from 'next/link'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { getFeaturedPublications } from '@/lib/publications'
import { getRecentPosts } from '@/lib/blog'
import content from '@/data/content.json'

export default function Home() {
  const featuredPublications = getFeaturedPublications(3)
  const recentPosts = getRecentPosts(3)

  return (
    <>
      {/* Hero Section */}
      <section className="container-custom py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              {content.home.hero.title}
            </h1>
            <p className="text-2xl text-primary font-medium">
              {content.home.hero.tagline}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              {content.home.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/research" size="lg">
                Explore Our Research
              </Button>
              <Button href="/team" variant="outline" size="lg">
                Meet the Team
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

      {/* About Section */}
      <section className="container-custom py-16">
        <Card padding="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">
              {content.home.about.title}
            </h2>
            <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
              <p>{content.home.about.paragraph1}</p>
              <p><strong>Question-driven research:</strong> {content.home.about.paragraph2}</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Research Pillars */}
      <section className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Research Pillars
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Currently, we focus on three main research pillars in the lab.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {content.research.pillars.map((pillar, index) => (
            <Card key={pillar.title} padding="lg">
              <div className="text-4xl font-bold text-primary/20 mb-4">{index + 1}</div>
              <h3 className="font-semibold text-xl mb-3 text-slate-900">{pillar.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{pillar.description}</p>
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

      {/* Work-Life Balance */}
      <section className="container-custom py-16">
        <Card padding="lg" className="bg-sage-50 border-sage-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
              {content.home.workLifeBalance.title}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {content.home.workLifeBalance.description}
            </p>
          </div>
        </Card>
      </section>

      {/* Prospective Students */}
      <section className="container-custom py-16">
        <Card padding="lg">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
              {content.home.prospectiveStudents.title}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {content.home.prospectiveStudents.description}
            </p>
            <Button href="/contact">Get in Touch</Button>
          </div>
        </Card>
      </section>

      {/* Latest Blog Posts */}
      {recentPosts.length > 0 && (
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
      )}
    </>
  )
}
