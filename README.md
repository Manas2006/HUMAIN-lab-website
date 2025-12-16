# HUMAIN Lab Website

A production-ready lab website built with Next.js 14+, TypeScript, and Tailwind CSS. Features a modern, accessible design with a soft sage green theme, blog functionality, and easy content management.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository** (or navigate to the project directory)

```bash
cd "lab website"
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
lab website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Home page
│   ├── research/           # Research page
│   ├── publications/       # Publications page
│   ├── team/               # Team page
│   ├── blog/               # Blog listing and posts
│   └── contact/            # Contact page
├── components/             # Reusable React components
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer
│   ├── Button.tsx          # Button component
│   ├── Card.tsx             # Card component
│   └── MDXContent.tsx      # MDX content renderer
├── content/                # Content files
│   └── blog/               # Blog posts (MDX files)
├── data/                   # JSON data files
│   ├── publications.json   # Publications data
│   └── team.json          # Team member data
├── lib/                    # Utility functions
│   ├── utils.ts           # General utilities
│   ├── publications.ts    # Publication helpers
│   └── blog.ts            # Blog helpers
├── public/                 # Static assets
└── ...config files
```

## ✏️ Editing Content

### Team Members

Edit `data/team.json` to add, remove, or update team members. The structure supports:

- **Faculty**: Principal investigators and professors
- **PhD Students**: Doctoral students
- **Masters**: Master's students
- **Undergrad**: Undergraduate researchers
- **Alumni**: Former lab members

Each member can have:
- Name, role, title
- Research interests
- Bio
- Email
- Links (website, Google Scholar, GitHub)

### Publications

Edit `data/publications.json` to manage publications. Each publication includes:

- Title, authors, venue, year
- Type (Conference, Journal, etc.)
- Tags for categorization
- Abstract
- Links (PDF, DOI, code)

### Blog Posts

Blog posts are stored as MDX files in `content/blog/`. To add a new post:

1. Create a new `.mdx` file (e.g., `my-new-post.mdx`)
2. Add frontmatter at the top:

```mdx
---
title: "Your Post Title"
publishedAt: "2024-01-15"
authors: ["Author Name"]
excerpt: "A brief description of the post"
tags: ["Tag1", "Tag2"]
---

# Your Post Title

Your content here in Markdown format...
```

3. Write your content using Markdown
4. The post will automatically appear on the blog page

**Note**: Set `draft: true` in frontmatter to hide a post from the public site.

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme. The current theme uses:

- **Primary**: Sage green (`#88B08B`)
- **Sage palette**: Various shades of green
- **Background**: Soft gradient from `rgb(203, 218, 201)` to `rgb(206, 221, 201)`

### Fonts

Fonts are configured in `app/layout.tsx`:
- **Body**: Inter (sans-serif)
- **Display**: Plus Jakarta Sans (headings)

### Styling

Global styles are in `app/globals.css`. Component styles use Tailwind utility classes.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy
4. Your site will be live at `your-project.vercel.app`

**Environment Variables** (optional):
- `NEXT_PUBLIC_SITE_URL`: Your site URL (for RSS feed)

### Netlify

1. Push your code to GitHub
2. In Netlify, click "New site from Git"
3. Select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Deploy!

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- AWS Amplify
- Railway
- DigitalOcean App Platform
- Self-hosted with Node.js

## 📧 Contact Form

The contact form on `/contact` currently uses a placeholder submission handler. To enable real email functionality:

### Option 1: API Route (Recommended)

1. Create `app/api/contact/route.ts`
2. Integrate with an email service (Resend, SendGrid, etc.)
3. Update the form submission in `app/contact/page.tsx`

Example with Resend:

```typescript
// app/api/contact/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { name, email, message } = await request.json()
  
  await resend.emails.send({
    from: 'contact@yourdomain.com',
    to: 'your-email@example.com',
    subject: `Contact form: ${name}`,
    html: `<p>From: ${email}</p><p>${message}</p>`,
  })
  
  return Response.json({ success: true })
}
```

### Option 2: EmailJS

Use EmailJS client-side (see [EmailJS docs](https://www.emailjs.com/docs/))

## 🔍 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessible (WCAG compliant)
- ✅ SEO optimized
- ✅ RSS feed (`/feed.xml`)
- ✅ Blog with search and filtering
- ✅ Publications with search and filters
- ✅ Team page with categorized members
- ✅ Contact form
- ✅ Fast performance (Next.js optimizations)
- ✅ Type-safe (TypeScript)

## 🛠️ Development

### Code Quality

- **Linting**: `npm run lint`
- **Formatting**: `npm run format`
- **Type checking**: Built into Next.js build

### Adding New Pages

1. Create a new directory in `app/` (e.g., `app/about/`)
2. Add `page.tsx` with your page content
3. Add the route to `components/Navbar.tsx` if needed

### Adding New Components

1. Create component file in `components/`
2. Use TypeScript for type safety
3. Follow existing component patterns
4. Use Tailwind for styling

## 📝 License

This project is open source and available for use by research labs and academic institutions.

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Email: contact@humainlab.edu

---

Built with ❤️ by HUMAIN Lab

