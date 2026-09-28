# bhuvana k s — portfolio

Editorial, case-study style portfolio. Built with Next.js 15 (App Router),
Tailwind CSS v4 and Framer Motion. Every route is statically prerendered.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

**All copy and data lives in one file: [`src/content/site.ts`](src/content/site.ts).**
You should never need to touch a component to update the site.

| What | Where in `site.ts` |
| --- | --- |
| Name, tagline, email, résumé path, availability badge | `site` |
| GitHub / LinkedIn / X links | `socials` |
| Roles + their full case studies | `work` |
| Side projects | `projects` |
| Skill groups | `skills` |
| Degree, CGPA | `education` |
| Papers | `publications` |
| Hackathons, judging | `achievements` |
| Header links | `nav` |

### Still to fill in (marked `TODO` in the file)

- [ ] `socials` — GitHub and LinkedIn hrefs (any left as `null` is hidden)
- [ ] `publications[0].href` — link to the CIISCA 2023 paper
- [ ] `projects` — 2–4 side projects
- [ ] `site.url` — the real deployed URL, once it exists

### Adding a project

Push an object into `projects`; the section on the home page builds itself.
While the array is empty it shows a quiet placeholder instead of a gap.

```ts
{
  name: "Graph Whisperer",
  pitch: "Ask a Neo4j database questions in English; get Cypher back.",
  stack: ["Python", "FastAPI", "Neo4j", "Ollama"],
  repo: "https://github.com/...",
  live: null,
  year: "2025",
}
```

### Adding a role / case study

Add an entry to `work` with a unique `slug`. A page appears at
`/work/<slug>`, it joins the numbered index on the home page and the
timeline on `/about`, and it gets wired into the "next" link at the bottom
of the neighbouring case study. Keep `index` values sequential (`01`, `02`, …).

## Structure

```
src/
  app/
    page.tsx              home — hero, work index, projects, stack, recognition
    about/page.tsx        long-form bio + timeline
    work/[slug]/page.tsx  one case study per role (SSG)
    layout.tsx            fonts, metadata, header/footer shell
    globals.css           design tokens + custom utilities
    sitemap.ts robots.ts
  components/             hero, work-index, project-grid, section, reveal,
                          site-header, site-footer, theme-toggle
  content/site.ts         ← all content
public/
  Bhuvana_KS_Resume.pdf
archive/retro/            the earlier pixel-art site, kept for reference
```

## Design notes

- **Type**: Instrument Serif for display and italic asides, Inter for body,
  JetBrains Mono for the uppercase labels.
- **Colour**: warm paper (`#faf8f3`) and near-black ink with a single
  terracotta accent. Dark mode follows the system preference and can be
  overridden with the header toggle (persisted in `localStorage`).
- **Tokens** are declared once in `globals.css` under `:root` and
  redefined for dark mode. Change the accent there and it changes everywhere.
- **Motion** is scroll-reveal only, and fully disabled under
  `prefers-reduced-motion`.

## Deploy

Push to GitHub, import the repo at [vercel.com/new](https://vercel.com/new),
accept the defaults. Then set `site.url` in `src/content/site.ts` to the real
domain so metadata and `sitemap.xml` point at the right place.
