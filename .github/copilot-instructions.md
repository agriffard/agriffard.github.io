# Copilot Instructions for AstroPaper Blog

This is an Astro-based static blog using the AstroPaper theme. Here's what you need to know to be productive:

## Architecture Overview

- **Framework**: Astro 5.x with TypeScript, using static site generation
- **Styling**: TailwindCSS 4.x with custom typography plugin
- **Content**: Markdown blog posts in `src/data/blog/` with frontmatter schema validation
- **Search**: Pagefind for static search functionality, copied to `public/pagefind/` during build
- **Package Manager**: pnpm (required - see `packageManager` field in package.json)

## Content Management

### Blog Posts
- Location: `src/data/blog/` (organized by year folders like `2025/`)
- Schema: Defined in `src/content.config.ts` with required fields: `title`, `pubDatetime`, `description`
- Frontmatter conventions:
  - `categories: [OrchardCore]` and `tags: [Release]` for taxonomy
  - `draft: true` to exclude from production builds
  - `featured: true` for homepage highlighting
  - `slug` for custom URLs (auto-generated from filename if omitted)

### Site Configuration
- `src/config.ts`: Main site settings (SITE object) - modify author, URLs, pagination settings
- `src/constants.ts`: Static constants and locale settings
- Edit post feature: Configured in SITE.editPost with GitHub edit links

## Development Patterns

### Component Structure
- **Astro Components**: Use `.astro` extension, TypeScript in frontmatter, HTML-like templates
- **Props Pattern**: Export `Props` interface, destructure with defaults: `const { title, frontmatter, secHeading = true } = Astro.props`
- **Styling**: Use Tailwind classes, follow existing patterns like `text-accent` for theme colors

### Path Resolution
- Import alias: `@/*` maps to `./src/*` (configured in tsconfig.json)
- Example: `import { SITE } from "@/config"` instead of relative paths

### Content Collections
- Blog collection uses Astro's new glob loader: `glob({ pattern: "**/[^_]*.md", base: "./src/data/blog" })`
- Type-safe content access via `CollectionEntry<"blog">`
- Utilities in `src/utils/`: `getSortedPosts.ts`, `getPostsByTag.ts`, etc.

## Build & Development

### Essential Commands
```bash
pnpm install                   # Install dependencies (required: pnpm)
pnpm run dev                   # Start dev server at localhost:4321
pnpm run build                 # Full build: type-check → astro build → pagefind → copy assets
pnpm run format                # Format with Prettier (includes astro plugin)
pnpm run lint                  # ESLint with astro plugin
```

### Build Process Specifics
- **Search Index**: `pagefind --site dist` generates search index after Astro build
- **Asset Copying**: `scripts/copy-pagefind.mjs` copies pagefind assets to public directory
- **Type Safety**: `astro check` runs before build to catch TypeScript errors

## Key Files for Modifications

### Layout & Theming
- `src/layouts/Layout.astro`: Main HTML wrapper with SEO meta, structured data
- `src/styles/global.css`: Global styles and CSS custom properties
- `public/toggle-theme.js`: Client-side theme switching logic

### Dynamic Routes
- `src/pages/posts/[slug]/index.astro`: Individual blog post pages
- `src/pages/tags/[tag]/[...page].astro`: Tag-based pagination
- `src/pages/categories/[category]/[...page].astro`: Category-based pagination

## Common Tasks

### Adding Blog Posts
1. Create `.md` file in `src/data/blog/YYYY/` with proper frontmatter
2. Use existing posts as templates for frontmatter structure
3. Categories and tags are arrays: `categories: [OrchardCore]`

### Modifying Theme
- Colors: Update Tailwind config or CSS custom properties in global.css
- Components: Follow existing patterns in `src/components/`
- Layout: Modify `src/layouts/` files for structural changes

### SEO & Meta
- OG images: Auto-generated via `src/utils/generateOgImages.ts` using Satori
- Sitemap: Handled by `@astrojs/sitemap` integration
- RSS: Generated in `src/pages/rss.xml.ts`

## Deployment Notes

- Static site optimized for GitHub Pages or similar
- Search functionality works entirely client-side (no server required)
- Docker support available with included Dockerfile and docker-compose.yml