import Link from 'next/link'
import Button from '@/components/Button'
import Card from '@/components/Card'
import { getFeaturedPublications } from '@/lib/publications'
import { getRecentPosts } from '@/lib/blog'

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
              HUMAIN Lab
            </h1>
            <p className="text-2xl text-primary font-medium">
              Build controllable machine intelligence that serves humanity safely.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              The HUman-centered MAchine INtelligence (HUMAIN) Lab has the mission to build 
              controllable machine intelligence that serves humanity safely.
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
              About the Lab
            </h2>
            <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
              <p>
                The research in the lab is naturally interdisciplinary. In addition to traditional 
                backbone subjects of machine learning (e.g., deep learning, statistics, optimization), 
                we also gain inspiration from social sciences including economics and psychology about 
                how we could model human preferences and behaviors, and develop rigorous human-subject 
                studies to evaluate machine learning systems and algorithms.
              </p>
              <p>
                We hope to develop a <strong>question-driven</strong> instead of a tool-driven research 
                culture in the lab. Thus, our research can be theoretical or empirical, and the technical 
                toolkits we use are diverse, ranging from statistical learning theory to sequential 
                decision-making to causal inference to control theory.
              </p>
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
          {researchPillars.map((pillar, index) => (
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
              Work-Life Balance
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The lab values the importance of work-life balance. Given that we are in such a 
              fast-paced field, it takes great effort to keep some time and space for ourselves 
              outside research. To maintain a sustainable working style, we hope to keep the lab 
              small but vibrant.
            </p>
          </div>
        </Card>
      </section>

      {/* Prospective Students */}
      <section className="container-custom py-16">
        <Card padding="lg">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
              Prospective Students
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              We are looking for motivated students who share similar research interests to join 
              the lab. If you are reaching out, please include your CV and why you are interested 
              in joining the lab in your email. If you do not hear back, please feel free to send 
              in a reminder.
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

const researchPillars = [
  {
    title: 'Foundations of Machine Intelligence',
    description:
      'Understand the foundations of state-of-the-art machine intelligence. The ultimate goal is to use this understanding to build next-generation machine intelligence. For example, we study why current transformer-based LLMs are so powerful and use findings as inspiration to design next-generation LLMs that are more factual and reliable.',
  },
  {
    title: 'Human-Centered Machine Learning',
    description:
      'Propose principled frameworks for developing human-centered machine learning. Focusing on particular ML applications that interact with humans (e.g., personalized recommender systems and decision-support systems), we study principled ways to model human preferences and behaviors and incorporate these models into the ML pipeline.',
  },
  {
    title: 'Societal & Economic Impact',
    description:
      'Evaluate and mediate the societal and economic impacts of large-scale machine learning systems. Our focus is on systems—recommender systems and LLMs—that interact with millions of people. We develop toolkits to facilitate the implementation of public policies for these systems.',
  },
]
