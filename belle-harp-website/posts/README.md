# Blog Posts Directory

This directory contains your blog posts written in Markdown format.

## Post Format

Each blog post should be a `.md` or `.mdx` file with the following structure:

```markdown
---
title: "Your Blog Post Title"
date: "2024-01-15"
readingTime: 5
tags: ["AI", "VC", "Blockchain"]
category: "AI"
image: "path/to/image.jpg"
excerpt: "A brief description of your post that will appear in the blog listing."
---

# Your Blog Post Title

Your blog post content goes here. You can use Markdown formatting:

- Lists
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Code blocks
- And more!
```

## Frontmatter Fields

- `title` (required): The title of your blog post
- `date` (required): Publication date in YYYY-MM-DD format
- `readingTime` (required): Estimated reading time in minutes
- `tags` (required): Array of tags for filtering
- `category` (optional): Main category for the post
- `image` (optional): Path to featured image
- `excerpt` (required): Short description shown in blog listing

## Setting Up Static Site Generation

To automatically convert these Markdown files into your blog:

### Option 1: Astro
1. Install Astro: `npm create astro@latest`
2. Configure content collections to read from this directory
3. Use Astro's Markdown processing

### Option 2: Next.js
1. Install Next.js: `npx create-next-app@latest`
2. Use `next-mdx-remote` or similar for Markdown processing
3. Create API routes to serve blog posts

### Option 3: Custom Script
You can create a simple Node.js script to:
1. Read all `.md` files from this directory
2. Parse frontmatter and content
3. Generate HTML or JSON
4. Update `blogs.html` to load the generated content

## Current Setup

Currently, `blogs.html` uses a JavaScript array to store blog posts. To migrate to Markdown:

1. Set up your static site generator
2. Configure it to process files in this directory
3. Update the `blogPosts` array in `blogs.html` to load from generated content
4. Or use a build step to generate a JSON file with all posts
