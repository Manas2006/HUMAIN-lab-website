'use client'

import { useState } from 'react'
import Card from '@/components/Card'
import content from '@/data/content.json'

export default function ContactPage() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(content.contact.contactInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format email for display (replace @ with [at])
  const displayEmail = content.contact.contactInfo.email.replace('@', '[at]')

  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          {content.contact.header.title}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {content.contact.header.description}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Prospective Students Notice */}
        <Card padding="lg" className="bg-sage-50 border-sage-200">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
            {content.contact.prospectiveStudents.title}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {content.contact.prospectiveStudents.description}
          </p>
        </Card>

        {/* Contact Info */}
        <Card padding="lg">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
            {content.contact.contactInfo.title}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Principal Investigator</h3>
              <p className="text-slate-600">{content.contact.contactInfo.piName}</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
              <button
                onClick={handleCopyEmail}
                className="text-primary hover:text-primary-dark text-lg cursor-pointer flex items-center gap-2"
                title="Click to copy"
              >
                {displayEmail}
                {copied ? (
                  <span className="text-sm text-primary">(Copied!)</span>
                ) : (
                  <span className="text-sm text-slate-400">(Click to copy)</span>
                )}
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Location</h3>
              <p className="text-slate-600 whitespace-pre-line">
                {content.contact.contactInfo.location}
              </p>
            </div>
          </div>
        </Card>

        {/* Research Interests */}
        <Card padding="lg" className="bg-primary text-white">
          <h3 className="font-semibold text-xl mb-3">{content.contact.researchInterests.title}</h3>
          <p className="text-white/90 leading-relaxed">
            {content.contact.researchInterests.description}
          </p>
        </Card>
      </div>
    </div>
  )
}
