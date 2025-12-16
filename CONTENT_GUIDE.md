# Content Management Guide

This guide explains how to add publications and blog posts to the HUMAIN Lab website.

## 📄 Adding Publications

Publications are stored in `data/publications.json`. To add a new publication:

1. **Open** `data/publications.json`
2. **Add a new entry** to the array. Here's the structure:

```json
{
  "id": "7",
  "title": "Your Paper Title",
  "authors": ["Author 1", "Author 2", "Author 3"],
  "venue": "Conference or Journal Name",
  "year": "2024",
  "type": "Conference",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "abstract": "Brief abstract or description of the paper.",
  "links": {
    "pdf": "https://example.com/paper.pdf",
    "doi": "https://doi.org/10.xxxx/example",
    "code": "https://github.com/username/repo"
  }
}
```

### Field Descriptions:
- **id**: Unique identifier (use next number in sequence)
- **title**: Full title of the publication
- **authors**: Array of author names (include all authors)
- **venue**: Conference or journal name (e.g., "CHI 2024", "Nature")
- **year**: Publication year as string
- **type**: "Conference", "Journal", "Workshop", "Preprint", etc.
- **tags**: Array of relevant tags (e.g., ["HCI", "AI", "Ethics"])
- **abstract**: Brief description (1-2 sentences)
- **links**: Object with optional links:
  - **pdf**: Link to PDF
  - **doi**: DOI link
  - **code**: GitHub/code repository link

### Example:
```json
{
  "id": "7",
  "title": "Understanding Human-AI Collaboration in Healthcare",
  "authors": ["Dr. Jane Smith", "Alice Chen", "Bob Johnson"],
  "venue": "CHI 2024",
  "year": "2024",
  "type": "Conference",
  "tags": ["HCI", "Healthcare", "Human-AI Interaction"],
  "abstract": "We present a study of how healthcare professionals collaborate with AI systems in clinical settings.",
  "links": {
    "pdf": "https://example.com/healthcare-ai.pdf",
    "doi": "https://doi.org/10.1145/example",
    "code": "https://github.com/humainlab/healthcare-ai"
  }
}
```

3. **Save** the file
4. The publication will automatically appear on the `/publications` page

## ✍️ Adding Blog Posts

Blog posts are stored as Markdown files in `content/blog/`. To add a new blog post:

1. **Create a new file** in `content/blog/` with a `.mdx` extension
2. **Name it** using lowercase, hyphens (e.g., `my-new-blog-post.mdx`)
3. **Add frontmatter** at the top, then write your content in Markdown

### File Structure:

```mdx
---
title: "Your Blog Post Title"
publishedAt: "2024-01-15"
authors: ["Author Name"]
excerpt: "A brief description that appears in the blog listing"
tags: ["Tag1", "Tag2"]
---

# Your Blog Post Title

Your content here in Markdown format...

## Section Heading

You can use all standard Markdown:
- Lists
- **Bold** and *italic* text
- [Links](https://example.com)
- Code blocks

### Subsection

More content...
```

### Frontmatter Fields:
- **title**: The post title (required)
- **publishedAt**: Publication date in YYYY-MM-DD format (required)
- **authors**: Array of author names (required)
- **excerpt**: Short description for the blog listing (required)
- **tags**: Array of tags for categorization (optional)
- **draft**: Set to `true` to hide from public site (optional)

### Example Blog Post:

```mdx
---
title: "New Research Findings on AI Transparency"
publishedAt: "2024-03-20"
authors: ["Alice Chen", "Dr. Jane Smith"]
excerpt: "We're excited to share our latest research on making AI systems more transparent and understandable."
tags: ["Research", "Transparency", "AI"]
---

# New Research Findings on AI Transparency

We're excited to share our latest research findings...

## Key Findings

Our study revealed several important insights:

1. Users prefer transparent AI systems
2. Transparency improves trust
3. Design matters for understanding

## Next Steps

We're continuing to explore...
```

### Markdown Tips:
- Use `#` for main heading
- Use `##` for section headings
- Use `-` or `*` for bullet lists
- Use `**text**` for bold, `*text*` for italic
- Use `[link text](url)` for links
- Use triple backticks for code blocks

4. **Save** the file
5. The blog post will automatically appear on `/blog` (unless `draft: true`)

## 🎨 Tips

### For Publications:
- Keep abstracts concise (1-2 sentences)
- Use consistent tag names across publications
- Include all authors in the authors array
- Add links when available (PDF, DOI, code)

### For Blog Posts:
- Write clear, engaging titles
- Keep excerpts to 1-2 sentences
- Use tags consistently
- Write in a conversational, accessible tone
- Use headings to organize content
- Add images if needed (place in `public/` folder)

## 📝 Workflow Recommendations

### For Publications:
1. When a paper is accepted, add it to `publications.json`
2. Update the year, venue, and type fields
3. Add the abstract and tags
4. Add links as they become available (PDF, DOI, etc.)

### For Blog Posts:
1. Write the post in Markdown
2. Add appropriate frontmatter
3. Review the post on the local dev server
4. Set `draft: true` if not ready to publish
5. Remove `draft: true` or set to `false` when ready

## 🔍 Finding Your Content

- **Publications**: View at `/publications` or search/filter by venue, tag, or keyword
- **Blog Posts**: View at `/blog` or access individual posts at `/blog/[slug]`
- **RSS Feed**: Available at `/feed.xml` for blog posts

## ❓ Troubleshooting

**Publication not showing?**
- Check JSON syntax (use a JSON validator)
- Ensure the `id` is unique
- Check that all required fields are present

**Blog post not showing?**
- Check that the file has `.mdx` extension
- Verify frontmatter is correct (YAML format)
- Ensure `draft` is not set to `true`
- Check file is in `content/blog/` directory

**Need help?**
- Check the main README.md for setup instructions
- Review existing publications/blog posts as examples
- Validate JSON at jsonlint.com
- Validate Markdown syntax

