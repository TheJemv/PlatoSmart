<p align="center">
  <img src="./assets/imagotipo.png" alt="PlatoSmart Logo" width="400" />
</p>

<p align="center">
  A modern recipe platform built with Next.js and Strapi.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img alt="Strapi" src="https://img.shields.io/badge/Strapi-5-8E75FF?logo=strapi" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" />
  <img alt="License" src="https://img.shields.io/badge/license-Private-lightgrey" />
</p>

---

## Overview

PlatoSmart is a full-stack recipe discovery platform. Users can browse recipes by category, search by title or ingredients, follow authors, and save their favorite dishes. Content is managed through a headless Strapi CMS and rendered with a Next.js App Router frontend.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| CMS | Strapi 5 |
| Database | PostgreSQL |
| Package Manager | pnpm |
| Containerization | Docker, Docker Compose |
| Tunneling / Edge | Cloudflare Tunnel |

## Project Structure

```
PlatoSmart/
├── app/                  # App Router pages
│   ├── about/
│   ├── authors/
│   │   └── [slug]/
│   ├── categories/
│   │   └── [slug]/
│   ├── contact/
│   ├── privacy/
│   ├── recipes/
│   │   └── [slug]/
│   ├── saved/
│   ├── terms/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── api/                  # Strapi API client layer
├── components/            # UI components (incl. shadcn/ui)
├── hooks/                  # Custom React hooks
├── lib/                     # Core utilities (Strapi client, etc.)
├── types/                    # Shared TypeScript types
├── utils/                     # Formatting & media helpers
├── public/                     # Static assets
├── Dockerfile
└── next.config.mjs
```

## Architecture

PlatoSmart's frontend is built with the Next.js App Router, using Server Components to fetch and render content directly from a headless Strapi CMS. Static pages (like the homepage) use Incremental Static Regeneration to stay fast while remaining current with newly published recipes, and dynamic routes (individual recipes, categories, and authors) are generated on demand from Strapi slugs.

The API layer (`api/`) abstracts all communication with Strapi per content type, returning fully-typed responses (`types/`) so the rest of the app never touches raw, untyped CMS payloads. Media (recipe covers, author avatars, category images) is resolved through Strapi's media library and served through Next.js Image optimization.

The app is containerized with a multi-stage Dockerfile (`deps` → `builder` → `runner`) on Node 22 Alpine, using pnpm managed via Corepack for fully reproducible builds.

## Features

- 🍽️ Browse recipes by category, author, or full-text search
- ⭐ Save favorite recipes locally
- 📱 Fully responsive, accessible UI (Radix UI + shadcn/ui)
- 🖼️ Optimized image delivery via Next.js Image + Strapi media library
- 🔎 SEO-ready: dynamic metadata, sitemap, robots.txt
- 🔄 Incremental Static Regeneration keeps content fresh without full redeploys

## License

Private project — all rights reserved.