# Catch Future — Puresar

A luxury digital presence for **Catch Future** and its flagship sub-brand **Puresar** — handcrafted textiles made from banana fibre, rooted in regenerative agriculture and uncompromised Indian craft heritage.

---

## What is this?

This is the official website and inquiry platform for Catch Future / Puresar. Visitors can:

- Discover the brand story, craft process, and collections
- Submit a reservation / inquiry for Puresar pieces
- Receive confirmation via email

A private admin dashboard (`/admin`) lets the team view, filter, and export all incoming inquiries.

## Live Site

**Preview (staging):** https://1a653202-80b4-4108-bcf0-ce465541ba46-00-20xm2nnrkrupq-lyt1298t.spock.replit.dev

> The production deployment is not yet live. The link above is the current development preview. A production URL (*.replit.app or custom domain) will replace it once the project is published.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite, Tailwind CSS, Framer Motion |
| Backend | Express 5 (Node 24) |
| Database | PostgreSQL via Drizzle ORM |
| Validation | Zod |
| Monorepo | pnpm workspaces |

---

## Project Structure

```
artifacts/
  catch-future/     # React + Vite frontend (landing page + admin UI)
  api-server/       # Express API server
lib/
  db/               # Drizzle ORM schema and migrations
  api-spec/         # OpenAPI spec + generated hooks/schemas
```

---

## Running Locally

### Prerequisites

- Node.js 24+
- pnpm 9+
- A running PostgreSQL database

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set environment variables

Both services require `PORT` to be set explicitly (they will refuse to start without it). The frontend also requires `BASE_PATH`. Run them in two separate terminals with different ports.

**Terminal 1 — API server:**

```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/catchfuture
SESSION_SECRET=your-session-secret
ADMIN_PASSWORD=your-admin-password

# Email notifications (optional — inquiries are always saved even if mail is missing)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
MAIL_FROM=noreply@catchfuture.com
MAIL_TO=atelier@catchfuture.com
```

**Terminal 2 — Frontend:**

```env
PORT=5173
BASE_PATH=/
```

### 3. Push the database schema

```bash
pnpm --filter @workspace/db run push
```

### 4. Start the API server (Terminal 1)

```bash
PORT=3001 DATABASE_URL=... SESSION_SECRET=... ADMIN_PASSWORD=... \
  pnpm --filter @workspace/api-server run dev
```

### 5. Start the frontend (Terminal 2)

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/catch-future run dev
```

The site will be available at `http://localhost:5173`.

---

## Admin Dashboard

A private dashboard is available at `/admin/login`. Sign in with the `ADMIN_PASSWORD` you set in the environment. From the dashboard you can:

- View all submitted inquiries
- Filter by inquiry type
- Export data as CSV

---

## Brand Palette

| Name | Value |
|---|---|
| Forest | `hsl(150, 32%, 14%)` |
| Beige | `hsl(41, 46%, 81%)` |
| Gold | `hsl(43, 45%, 45%)` |
| Cream | `hsl(45, 30%, 94%)` |

---

## Contributing

This is a private commercial project. Please contact the team before submitting pull requests.
