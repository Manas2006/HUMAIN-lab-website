import Card from '@/components/Card'
import Button from '@/components/Button'

export default function ResearchPage() {
  return (
    <div className="container-custom py-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          Research
        </h1>
        <p className="text-xl text-primary font-medium mb-4">
          Build controllable machine intelligence that serves humanity safely.
        </p>
        <p className="text-lg text-slate-600 leading-relaxed">
          Our research is naturally interdisciplinary, combining machine learning with insights 
          from economics, psychology, and rigorous human-subject studies.
        </p>
      </div>

      {/* Research Philosophy */}
      <Card padding="lg" className="mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
            Our Approach
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We develop a <strong>question-driven</strong> instead of a tool-driven research culture. 
            Our research can be theoretical or empirical, and the technical toolkits we use are diverse, 
            ranging from statistical learning theory to sequential decision-making to causal inference 
            to control theory.
          </p>
          <p className="text-slate-600 leading-relaxed">
            In addition to traditional backbone subjects of machine learning (deep learning, statistics, 
            optimization), we gain inspiration from social sciences about how to model human preferences 
            and behaviors.
          </p>
        </div>
      </Card>

      {/* Research Pillars */}
      <div className="mb-16">
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-8 text-center">
          Research Pillars
        </h2>
        <div className="space-y-8">
          {researchPillars.map((pillar, index) => (
            <Card key={pillar.title} padding="lg">
              <div className="flex gap-6">
                <div className="text-5xl font-bold text-primary/20 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  {pillar.highlight && (
                    <div className="bg-sage-50 border-l-4 border-primary p-4 rounded-r-lg">
                      <p className="text-slate-700 text-sm">{pillar.highlight}</p>
                    </div>
                  )}
                  {pillar.publication && (
                    <div className="mt-4 p-4 bg-white border border-sage-200 rounded-xl">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                        Recent Publication
                      </p>
                      <p className="font-semibold text-slate-900 mb-1">{pillar.publication.title}</p>
                      <p className="text-sm text-slate-600">{pillar.publication.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Looking for Students */}
      <Card padding="lg" className="bg-primary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-4">
            Looking for Students
          </h2>
          <p className="text-white/90 leading-relaxed mb-6">
            We are looking for students interested in exploring the generalization behaviors of 
            large language models. If you share similar research interests, reach out!
          </p>
          <Button href="/contact" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
            Get in Touch
          </Button>
        </div>
      </Card>
    </div>
  )
}

const researchPillars = [
  {
    title: 'Understand the Foundations of Machine Intelligence',
    description:
      'The ultimate goal is to use this understanding to build next-generation machine intelligence. For example, we study why the current transformer-based LLMs are so powerful and use the findings as inspiration to design the next-generation LLMs so that they are more factual and reliable.',
    highlight:
      'We are looking for students interested in exploring the generalization behaviors of large language models.',
  },
  {
    title: 'Principled Frameworks for Human-Centered Machine Learning',
    description:
      'Focusing on particular machine learning applications that interact with humans (e.g., personalized recommender systems and decision-support systems), we study principled ways to model human preferences and behaviors and incorporate these models into the machine learning pipeline.',
    publication: {
      title: 'Personalized Language Modeling from Personalized Human Feedback',
      description:
        'We develop a personalized RLHF framework for fine-tuning personalized language models attuned to a diverse set of human preferences.',
    },
  },
  {
    title: 'Evaluate and Mediate Societal & Economic Impacts',
    description:
      'Our focus is on machine learning systems—recommender systems and LLMs—that have been deployed to interact with millions of people. In addition to evaluating the impacts of these systems, we develop toolkits to facilitate the implementation of public policies (e.g., ways to perform data deletion efficiently).',
    publication: {
      title: 'Recommender Systems as Dynamical Systems: Interactions with Viewers and Creators',
      description:
        'In societal domains where AI interacts with users, we argue that formal interaction models—mathematical models that formalize how AI and users influence each other—can enhance AI design and evaluation practices to achieve a positive societal impact.',
    },
  },
]
