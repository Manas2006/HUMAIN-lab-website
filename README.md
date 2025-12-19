# HUMAIN Lab Website

A modern lab website built with Next.js 14, TypeScript, and Tailwind CSS featuring a secure admin panel for content management.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Features

- **Modern Design**: Responsive layout with sage green theme
- **Admin Panel**: Secure content management at `/admin`
- **Publications**: Searchable/filterable publication listings
- **Blog**: MDX-powered blog with RSS feed
- **Team Page**: Organized by role with profile pictures

## Project Structure

```
├── app/                  # Next.js pages
│   ├── admin/           # Admin panel (protected)
│   ├── api/             # API routes
│   ├── blog/            # Blog pages
│   ├── publications/    # Publications page
│   ├── team/            # Team page
│   └── ...
├── components/          # React components
├── content/blog/        # Blog posts (MDX)
├── data/                # JSON data files
│   ├── publications.json
│   └── team.json
├── lib/                 # Utilities
└── public/              # Static assets
```

## Content Management

### Option 1: Admin Panel (Recommended)

1. Go to `/admin/login`
2. Log in with admin credentials
3. Manage publications, blog posts, and team members via the web UI

### Option 2: Direct File Editing

- **Team**: Edit `data/team.json`
- **Publications**: Edit `data/publications.json`
- **Blog**: Add `.mdx` files to `content/blog/`

## Admin Setup

### 1. Create Environment Variables

Create `.env.local`:

```env
# Authentication
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3000

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# GitHub API (required for Vercel deployment)
GITHUB_TOKEN=ghp_your_token
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo
GITHUB_BRANCH=main
```

### 2. Generate Password Hash (Production)

For production, use a hashed password:

```bash
node -e "require('bcryptjs').hash('your-password',10).then(h=>console.log(h))"
```

Add to `.env.local`:
```env
ADMIN_PASSWORD_HASH=$2a$10$...your-hash...
```

### 3. GitHub Token (For Vercel)

The admin panel commits changes to GitHub when deployed on Vercel:

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate a token with `repo` scope
3. Add as `GITHUB_TOKEN` in your environment

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD_HASH`
   - `GITHUB_TOKEN`
   - `GITHUB_OWNER`
   - `GITHUB_REPO`
   - `GITHUB_BRANCH`

### How It Works on Vercel

- Admin changes are committed to GitHub via API
- Vercel auto-deploys from GitHub (~1-2 min delay)
- Changes persist permanently in your repo

## Customization

### Colors

Edit `tailwind.config.ts`:
- Primary: Sage green (`#88B08B`)
- Background: Gradient from `rgb(203, 218, 201)` to `rgb(206, 221, 201)`

### Fonts

Configured in `app/layout.tsx`:
- Body: Inter
- Headings: Plus Jakarta Sans

## Development

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Lint code
```

## License

Open source for research labs and academic institutions.

---

Built with ❤️ by HUMAIN Lab
