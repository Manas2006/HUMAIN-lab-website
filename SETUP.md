# Quick Setup Guide

## First Time Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   Navigate to http://localhost:3000

## Next Steps

### 1. Customize Content

- **Team**: Edit `data/team.json`
- **Publications**: Edit `data/publications.json`
- **Blog Posts**: Add `.mdx` files to `content/blog/`

### 2. Update Site Information

- Edit `app/layout.tsx` for site metadata
- Update footer in `components/Footer.tsx`
- Change contact email in `app/contact/page.tsx`

### 3. Configure Contact Form

The contact form currently uses a placeholder. To enable real email:

1. Choose an email service (Resend, SendGrid, etc.)
2. Create `app/api/contact/route.ts`
3. Add API key to environment variables
4. Update form submission in `app/contact/page.tsx`

See README.md for detailed instructions.

### 4. Deploy

**Vercel (Recommended)**:
1. Push to GitHub
2. Import in Vercel
3. Deploy automatically

**Netlify**:
1. Push to GitHub
2. New site from Git in Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`

## File Structure Overview

- `app/` - Next.js pages and routes
- `components/` - Reusable React components
- `content/blog/` - Blog posts (MDX files)
- `data/` - JSON data (team, publications)
- `lib/` - Utility functions
- `public/` - Static assets (images, videos)

## Common Tasks

### Add a Blog Post

1. Create new file: `content/blog/my-post.mdx`
2. Add frontmatter:
   ```mdx
   ---
   title: "My Post"
   publishedAt: "2024-01-15"
   authors: ["Author Name"]
   excerpt: "Description"
   tags: ["Tag1", "Tag2"]
   ---
   ```
3. Write content in Markdown

### Add Team Member

Edit `data/team.json` and add to appropriate category (faculty, phd, masters, etc.)

### Add Publication

Edit `data/publications.json` and add new entry

### Change Colors

Edit `tailwind.config.ts` - modify the `sage` and `primary` color definitions

## Troubleshooting

**Build errors**: Run `npm run lint` to check for issues

**Blog posts not showing**: Check that files are in `content/blog/` with `.mdx` extension

**Styling issues**: Ensure Tailwind is properly configured in `tailwind.config.ts`

**Type errors**: Run `npm run build` to see TypeScript errors

## Need Help?

See README.md for comprehensive documentation.

