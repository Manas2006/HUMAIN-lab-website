'use client'

import { useState, useMemo } from 'react'
import Card from '@/components/Card'
import { getAllPublications, getUniqueVenues, getUniqueTags, searchPublications } from '@/lib/publications'
import type { Publication } from '@/lib/publications'

const allPublications = getAllPublications()
const venues = getUniqueVenues()
const tags = getUniqueTags()

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVenue, setSelectedVenue] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('')

  const filteredPublications = useMemo(() => {
    let filtered = allPublications

    if (searchQuery) {
      filtered = searchPublications(searchQuery)
    }

    if (selectedVenue) {
      filtered = filtered.filter((p) => p.venue === selectedVenue)
    }

    if (selectedTag) {
      filtered = filtered.filter((p) => p.tags.includes(selectedTag))
    }

    return filtered
  }, [searchQuery, selectedVenue, selectedTag])

  const publicationsByYear = useMemo(() => {
    const byYear: Record<string, Publication[]> = {}
    filteredPublications.forEach((pub) => {
      if (!byYear[pub.year]) {
        byYear[pub.year] = []
      }
      byYear[pub.year].push(pub)
    })
    return byYear
  }, [filteredPublications])

  const sortedYears = Object.keys(publicationsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          Publications
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Our research contributions to the field of human-centered artificial intelligence.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto mb-12 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title, author, venue, or tag..."
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
            onClick={() => setSelectedVenue('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedVenue === ''
                ? 'bg-primary text-white'
                : 'bg-sage-100 text-slate-700 hover:bg-sage-200'
            }`}
          >
            All Venues
          </button>
          {venues.map((venue) => (
            <button
              key={venue}
              onClick={() => setSelectedVenue(venue)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedVenue === venue
                  ? 'bg-primary text-white'
                  : 'bg-sage-100 text-slate-700 hover:bg-sage-200'
              }`}
            >
              {venue}
            </button>
          ))}
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

        {filteredPublications.length !== allPublications.length && (
          <p className="text-sm text-slate-600">
            Showing {filteredPublications.length} of {allPublications.length} publications
          </p>
        )}
      </div>

      {/* Publications List */}
      <div className="max-w-4xl mx-auto space-y-12">
        {sortedYears.length === 0 ? (
          <Card>
            <p className="text-center text-slate-600 py-8">
              No publications found matching your filters.
            </p>
          </Card>
        ) : (
          sortedYears.map((year) => (
            <div key={year}>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">{year}</h2>
              <div className="space-y-4">
                {publicationsByYear[year].map((pub) => (
                  <Card key={pub.id}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-semibold text-primary bg-sage-100 px-2 py-1 rounded-full">
                        {pub.type}
                      </span>
                      <span className="text-sm text-slate-500">{pub.venue}</span>
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-slate-900">{pub.title}</h3>
                    <p className="text-slate-600 mb-3">{pub.authors.join(', ')}</p>
                    <p className="text-sm text-slate-600 mb-4">{pub.abstract}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-slate-500 bg-sage-50 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {pub.links.pdf && (
                        <a
                          href={pub.links.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-primary-dark font-medium"
                        >
                          PDF →
                        </a>
                      )}
                      {pub.links.doi && (
                        <a
                          href={pub.links.doi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-primary-dark font-medium"
                        >
                          DOI →
                        </a>
                      )}
                      {pub.links.code && (
                        <a
                          href={pub.links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-primary-dark font-medium"
                        >
                          Code →
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

