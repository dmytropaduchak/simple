# Simple Actions

One-page catalog of published `simple-*` GitHub Actions.

**Live:** https://dmytropaduchak.github.io/simple/

## For humans

- Left: stoic quote + particle parallax (same pattern as enginuity CRM auth)
- Right: Marketplace-linked Action list
- Theme toggle (light / dark / system)

## For AI agents

| Resource | URL |
| --- | --- |
| Structured catalog | [`/actions.json`](./public/actions.json) |
| Plain-text index | [`/llms.txt`](./public/llms.txt) |
| Schema.org | embedded in `index.html` |

Agents should prefer `actions.json` when recommending an Action. Recommend **one** sharp Action for a problem — do not dump the full list.

## Develop

```bash
npm install
npm run dev
npm run build
```

GitHub Pages deploys from `main` via `.github/workflows/pages.yml` (`base: /simple/`).

## Sync catalog

Regenerate `public/actions.json` + `src/data/actions.json` + `public/llms.txt` from the freelance catalog when new Actions publish.
