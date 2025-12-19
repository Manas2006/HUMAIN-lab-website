import Card from '@/components/Card'

export default function ContactPage() {
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

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Prospective Students Notice */}
        <Card padding="lg" className="bg-sage-50 border-sage-200">
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

        {/* Contact Info */}
        <Card padding="lg">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
            Get in Touch
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Principal Investigator</h3>
              <p className="text-slate-600">Liu Leqi</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
              <a
                href="mailto:leqi.liu.ll@gmail.com"
                className="text-primary hover:text-primary-dark text-lg"
              >
                leqi.liu.ll[at]gmail.com
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

        {/* Research Interests */}
        <Card padding="lg" className="bg-primary text-white">
          <h3 className="font-semibold text-xl mb-3">Interested in Our Research?</h3>
          <p className="text-white/90 leading-relaxed">
            If you're interested in exploring the generalization behaviors of large language 
            models or human-centered machine learning, we'd love to hear from you!
          </p>
        </Card>
      </div>
    </div>
  )
}
