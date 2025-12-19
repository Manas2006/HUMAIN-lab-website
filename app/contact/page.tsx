'use client'

import { useState, FormEvent } from 'react'
import Card from '@/components/Card'
import Button from '@/components/Button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // In a real implementation, you would call an API route here
      // For now, we'll simulate a submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Get in touch with our lab. We'd love to hear from you!
        </p>
      </div>

      {/* Prospective Students Notice */}
      <Card padding="lg" className="max-w-3xl mx-auto mb-8 bg-sage-50 border-sage-200">
        <h2 className="font-display text-xl font-bold text-slate-900 mb-3">
          Prospective Students
        </h2>
        <p className="text-slate-600 leading-relaxed">
          We are looking for motivated students who share similar research interests to join the lab. 
          If you are reaching out, please include <strong>your CV</strong> and <strong>why you are 
          interested in joining the lab</strong> in your email. If you do not hear back, please feel 
          free to send a reminder.
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact Form */}
        <Card padding="lg">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
            Send us a message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Your message..."
              />
            </div>
            {submitStatus === 'success' && (
              <div className="p-4 bg-sage-100 text-primary rounded-xl text-sm">
                Thank you! Your message has been sent. We'll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                Something went wrong. Please try again or email us directly.
              </div>
            )}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Card>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card padding="lg">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
              Get in touch
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Principal Investigator</h3>
                <p className="text-slate-600">Liu Leqi</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
                <a
                  href="mailto:contact@humainlab.edu"
                  className="text-primary hover:text-primary-dark"
                >
                  contact@humainlab.edu
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Location</h3>
                <p className="text-slate-600">
                  Department of Computer Science<br />
                  University of Texas at Austin
                </p>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="bg-primary text-white">
            <h3 className="font-semibold mb-3">Research Interests?</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              If you're interested in exploring the generalization behaviors of large language 
              models or human-centered machine learning, we'd love to hear from you!
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
