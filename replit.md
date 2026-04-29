# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Catch Future / Puresar app (`artifacts/catch-future`)

Luxury landing page for Catch Future and its sub-brand Puresar (banana-fiber sustainable luxury textiles).

- Sovereign Aesthetic palette: Forest `hsl(150 32% 14%)`, Beige `hsl(41 46% 81%)`, Gold `hsl(43 45% 45%)`, Cream `hsl(45 30% 94%)`. Vertical/diagonal split backdrops via `.split-bg` and braided weave overlay via `.weave-texture` (auto-inverts on dark / `.bg-forest` containers).
- Hero "Reserve Now" CTA jumps to `#inquiry` (the public form section).
- Inquiry form (`/`) → `POST /api/inquiries` → Postgres `inquiries` table.
- Private admin "Lookbook Ledger" at `/admin/login` and `/admin`. Cookie session signed with `SESSION_SECRET`; gated by `ADMIN_PASSWORD` secret. Endpoints: `POST /api/admin/login`, `POST /api/admin/logout`, `GET /api/admin/me`, `GET /api/admin/inquiries`. Dashboard supports filtering by inquiry type and CSV export.
