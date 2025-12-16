// Simple markdown rendering component

export function MDXContent({ content }: { content: string }) {
  // Simple markdown rendering - in production, you'd use a proper MDX renderer
  // For now, we'll render it as plain text with basic formatting
  const lines = content.split('\n')
  const elements: JSX.Element[] = []
  
  let currentParagraph: string[] = []
  
  lines.forEach((line, index) => {
    const trimmed = line.trim()
    
    if (trimmed === '') {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="mb-4 text-slate-700 leading-relaxed">
            {currentParagraph.join(' ')}
          </p>
        )
        currentParagraph = []
      }
      return
    }
    
    if (trimmed.startsWith('# ')) {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="mb-4 text-slate-700 leading-relaxed">
            {currentParagraph.join(' ')}
          </p>
        )
        currentParagraph = []
      }
      elements.push(
        <h1 key={`h1-${index}`} className="text-3xl font-bold mt-8 mb-4 text-slate-900">
          {trimmed.slice(2)}
        </h1>
      )
    } else if (trimmed.startsWith('## ')) {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="mb-4 text-slate-700 leading-relaxed">
            {currentParagraph.join(' ')}
          </p>
        )
        currentParagraph = []
      }
      elements.push(
        <h2 key={`h2-${index}`} className="text-2xl font-bold mt-6 mb-3 text-slate-900">
          {trimmed.slice(3)}
        </h2>
      )
    } else if (trimmed.startsWith('### ')) {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="mb-4 text-slate-700 leading-relaxed">
            {currentParagraph.join(' ')}
          </p>
        )
        currentParagraph = []
      }
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl font-semibold mt-4 mb-2 text-slate-900">
          {trimmed.slice(4)}
        </h3>
      )
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="mb-4 text-slate-700 leading-relaxed">
            {currentParagraph.join(' ')}
          </p>
        )
        currentParagraph = []
      }
      elements.push(
        <ul key={`ul-${index}`} className="list-disc list-inside mb-4 space-y-2 text-slate-700 ml-4">
          <li>{trimmed.slice(2)}</li>
        </ul>
      )
    } else {
      currentParagraph.push(trimmed)
    }
  })
  
  if (currentParagraph.length > 0) {
    elements.push(
      <p key="p-final" className="mb-4 text-slate-700 leading-relaxed">
        {currentParagraph.join(' ')}
      </p>
    )
  }
  
  return <div>{elements}</div>
}

