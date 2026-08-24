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

## API

Each live MCP is at `https://brainiac.software/mcp/<slug>/v1` (Streamable HTTP).

Thin route handlers construct a service, call it, and map errors. Services throw the original `Error`; routes log it and return `{ error: message }` with the real status. Logs look like `[ERROR][app][api][mcp][psl] …`.

- `src/app/mcp/[slug]/v1/route.ts` — GET / POST / DELETE / OPTIONS
- `src/services/mcp-http-service.ts` — CORS, 404, `mcp-handler`
- `src/services/mcp-catalog.ts` — which slugs are live
- `src/services/mcps/*-service.ts` — 2–5 tools each; throw on bad input

Live now: `psl`, `idna`, `phone`, `unicode`, `tokens`. Other catalog slugs return `404` until they ship.

Cursor connect snippet:

```json
{
  "mcpServers": {
    "psl": {
      "url": "https://brainiac.software/mcp/psl/v1"
    }
  }
}
```
