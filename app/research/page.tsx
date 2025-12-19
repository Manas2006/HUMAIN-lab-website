import Card from '@/components/Card'
import content from '@/data/content.json'

export default function ResearchPage() {
  return (
    <div className="container-custom py-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          {content.research.header.title}
        </h1>
        <p className="text-xl text-primary font-medium mb-4">
          {content.research.header.tagline}
        </p>
        <p className="text-lg text-slate-600 leading-relaxed">
          {content.research.header.description}
        </p>
      </div>

      {/* Research Philosophy */}
      <Card padding="lg" className="mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
            {content.research.approach.title}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Question-driven research:</strong> {content.research.approach.paragraph1}
          </p>
          <p className="text-slate-600 leading-relaxed">
            {content.research.approach.paragraph2}
          </p>
        </div>
      </Card>

      {/* Research Pillars */}
      <div>
        <h2 className="font-display text-3xl font-bold text-slate-900 mb-8 text-center">
          Research Pillars
        </h2>
        <div className="space-y-8">
          {content.research.pillars.map((pillar, index) => (
            <Card key={pillar.title} padding="lg">
              <div className="flex gap-6">
                <div className="text-5xl font-bold text-primary/20 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                  {pillar.highlight && (
                    <div className="mt-4 bg-sage-50 border-l-4 border-primary p-4 rounded-r-lg">
                      <p className="text-slate-700 text-sm">{pillar.highlight}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
