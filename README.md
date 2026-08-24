# Simple MCPs

Catalog of small remote MCP servers hosted at [brainiac.software](https://brainiac.software).

Same visual pattern as [simple Actions](https://dmytropaduchak.github.io/simple/): stoic quote + particle parallax on the left, searchable catalog on the right.

## Stack

- Next.js (App Router) on Vercel
- Postgres via Prisma (`DATABASE_URL`) — optional until you add it
- Without `DATABASE_URL`, the page uses the built-in seed in `src/data/mcps.ts`

## Develop

```bash
npm install
npm run dev
```

## Database (when you add env)

In Vercel: `DATABASE_URL` (Vercel Postgres / Neon) and `NEXT_PUBLIC_SITE_URL=https://brainiac.software`.

```bash
npx prisma db push
npm run db:seed
```

Each MCP is meant to live at `https://brainiac.software/mcp/<slug>/v1`.
