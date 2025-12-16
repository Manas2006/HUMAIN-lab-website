import Card from '@/components/Card'

const researchAreas = [
  {
    title: 'Responsible AI',
    description:
      'We develop ethical frameworks and practices to ensure AI systems are fair, transparent, and aligned with human values. Our work includes bias detection and mitigation, algorithmic fairness, and governance mechanisms.',
    tags: ['Ethics', 'Fairness', 'Transparency', 'Governance'],
  },
  {
    title: 'Human-AI Interaction',
    description:
      'We design intuitive interfaces and interaction paradigms that make AI technology more accessible and user-friendly. Our research explores how humans understand, trust, and collaborate with AI systems.',
    tags: ['HCI', 'UX Design', 'Trust', 'Collaboration'],
  },
  {
    title: 'Evaluation + Safety',
    description:
      'We develop comprehensive evaluation methods that go beyond traditional accuracy metrics to assess safety, fairness, robustness, and societal impact of AI systems.',
    tags: ['Evaluation', 'Safety', 'Robustness', 'Metrics'],
  },
  {
    title: 'Systems + Deployment',
    description:
      'We bridge the gap between research and real-world deployment, building robust AI systems that can be reliably deployed in production environments while maintaining performance and reliability.',
    tags: ['Systems', 'Deployment', 'MLOps', 'Infrastructure'],
  },
  {
    title: 'Machine Learning for Social Good',
    description:
      'We apply machine learning techniques to address societal challenges in healthcare, education, and environmental sustainability, ensuring equitable outcomes and positive impact.',
    tags: ['Social Good', 'Healthcare', 'Education', 'Sustainability'],
  },
  {
    title: 'Explainable AI',
    description:
      'We develop methods and tools to make AI systems more interpretable and explainable, helping users understand how AI makes decisions and building trust in AI-powered applications.',
    tags: ['Explainability', 'Interpretability', 'Transparency', 'Trust'],
  },
]

export default function ResearchPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          Research Areas
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          We conduct cutting-edge research across multiple domains of artificial intelligence
          and human-computer interaction. Our work focuses on creating AI systems that enhance
          human capabilities and create positive societal impact.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {researchAreas.map((area) => (
          <Card key={area.title} padding="lg">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
              {area.title}
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">{area.description}</p>
            <div className="flex flex-wrap gap-2">
              {area.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-primary bg-sage-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

