import publicationsData from '@/data/publications.json'

export interface Publication {
  id: string
  title: string
  authors: string[]
  venue: string
  year: string
  type: string
  tags: string[]
  abstract: string
  links: {
    pdf?: string
    doi?: string
    code?: string
  }
}

export function getAllPublications(): Publication[] {
  return publicationsData as Publication[]
}

export function getFeaturedPublications(count: number = 3): Publication[] {
  const pubs = getAllPublications()
  return pubs.slice(0, count)
}

export function getPublicationsByYear(): Record<string, Publication[]> {
  const pubs = getAllPublications()
  const byYear: Record<string, Publication[]> = {}
  
  pubs.forEach((pub) => {
    if (!byYear[pub.year]) {
      byYear[pub.year] = []
    }
    byYear[pub.year].push(pub)
  })
  
  return byYear
}

export function searchPublications(query: string): Publication[] {
  const pubs = getAllPublications()
  const lowerQuery = query.toLowerCase()
  
  return pubs.filter(
    (pub) =>
      pub.title.toLowerCase().includes(lowerQuery) ||
      pub.authors.some((author) => author.toLowerCase().includes(lowerQuery)) ||
      pub.venue.toLowerCase().includes(lowerQuery) ||
      pub.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

export function getUniqueVenues(): string[] {
  const pubs = getAllPublications()
  return Array.from(new Set(pubs.map((p) => p.venue))).sort()
}

export function getUniqueTags(): string[] {
  const pubs = getAllPublications()
  const allTags = pubs.flatMap((p) => p.tags)
  return Array.from(new Set(allTags)).sort()
}

