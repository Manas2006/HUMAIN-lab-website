import Link from 'next/link'

const footerLinks = {
  research: [
    { href: '/research', label: 'Research Areas' },
    { href: '/publications', label: 'Publications' },
  ],
  about: [
    { href: '/team', label: 'Team' },
    { href: '/blog', label: 'Blog' },
  ],
  connect: [
    { href: '/contact', label: 'Contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-sage-200 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Lab Info */}
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-bold text-primary-dark mb-4">
              HUMAIN Lab
            </h3>
            <p className="text-slate-600 mb-4 max-w-md">
              Advancing Human-Centered Artificial Intelligence through ethical research
              and innovative technology solutions.
            </p>
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:contact@humainlab.edu" className="hover:text-primary">
                  contact@humainlab.edu
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-4">Research</h4>
            <ul className="space-y-2">
              {footerLinks.research.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-sage-200 text-center text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} HUMAIN Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

