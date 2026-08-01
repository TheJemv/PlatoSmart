<p align="center">
  <img src="./assets/imagotipo.png" alt="PlatoSmart Logo" width="400" />
</p>

<h1 align="center">PlatoSmart</h1>

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
├── assets/            # Brand assets (logos, category covers)
├── frontend/           # Next.js application
│   ├── app/            # App Router pages
│   ├── api/             # Strapi API client layer
│   ├── components/      # UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/               # Core utilities (Strapi client, etc.)
│   ├── types/              # Shared TypeScript types
│   └── Dockerfile
├── strapi/              # Headless CMS
│   ├── src/api/           # Content types, controllers, routes
│   └── Dockerfile
├── tester/               # Content generation & seeding scripts
└── docker-compose.yml    # Orchestrates frontend, Strapi, DB, and tunnel
```

## Features

- 🍽️ Browse recipes by category, author, or search
- ⭐ Save favorite recipes (client-side)
- 📱 Fully responsive, accessible UI (Radix + shadcn/ui)
- 🖼️ Optimized image delivery via Next.js Image + Strapi media library
- 🔎 SEO-ready: dynamic metadata, sitemap, robots.txt
- 🔄 Incremental Static Regeneration for fresh content without full rebuilds

## Getting Started

### Prerequisites

- Node.js 22+
- [pnpm](https://pnpm.io/)
- Docker & Docker Compose (for full-stack local development or production)

### Local Development (frontend only)

```bash
cd frontend
pnpm install
pnpm dev
```

The app will be available at `http://localhost:3000`.

### Full Stack with Docker Compose

From the project root:

```bash
docker compose up -d --build
```

This spins up:
- `frontend` — the Next.js app
- `strapi` — the CMS
- `strapiDB` — PostgreSQL database
- `cloudflared` — Cloudflare Tunnel for public access

To rebuild only the frontend:

```bash
docker compose up -d --build frontend
```

## Available Scripts (frontend)

| Script | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production build locally |
| `pnpm lint` | Run ESLint |

## Environment Variables

Each service requires its own `.env` file (`frontend/.env`, `strapi/.env`). These are never committed to version control. See `.env.example` in each service for the required variables.

## Deployment

The frontend is deployed as a multi-stage Docker image (`deps` → `builder` → `runner`) running on Node 22 Alpine with pnpm via Corepack. Static assets are optimized at build time, while the homepage uses ISR (`revalidate`) to stay in sync with Strapi content without requiring a full redeploy.

## License

Private project — all rights reserved.