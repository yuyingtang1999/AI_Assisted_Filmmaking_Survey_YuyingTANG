# Algorithm behind the Lens

An interactive showcase of Yuying Tang's PQE survey, **"Mapping the Labor Landscape of AI-Assisted Filmmaking."** Built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**. Nothing is hardcoded to a local machine — clone it anywhere, install, and run.

## What's inside

A single scrollytelling page that walks through the research:

- **Hero** — the framing question, "Who is really making the film?"
- **Framework** — the three-layer taxonomy (Labor Sites → Labor Types → Human–AI Allocation).
- **Layer 1 · Labor Sites** — an interactive ATL/BTL × Individual/Group matrix.
- **Layer 2 · Labor Types** — a 2021→2025 timeline showing AI's spread across labor types.
- **Layer 3 · Allocation** — human-vs-AI control per labor type.
- **Synthesis** — a Sankey-style flow from sites to types to allocation.
- **The Archive** — a filterable explorer of all 31 systems; click any card to open its paper (DOI).
- **Conclusion** — three takeaways and a CSV download of the corpus.

The full dataset (31 papers, coded by site / type / allocation, with DOI links) lives in `lib/data.ts` and is also downloadable at `public/ai-filmmaking-corpus.csv`. The palette is taken directly from the PQE deck's gradient scheme.

## Requirements

- [Node.js](https://nodejs.org) **18.18 or newer** (Node 20+ recommended)
- npm (bundled with Node)

Check your version:

```bash
node -v
```

## Run locally (VS Code)

1. Open this folder in VS Code.
2. Open a terminal (`` Ctrl+` `` / `` Cmd+` ``) — make sure it's in the project root (the folder containing `package.json`).
3. Install dependencies (first time only):

   ```bash
   npm install
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open **http://localhost:3000** in your browser. The page hot-reloads as you edit files.

## Run from a fresh clone (any machine)

```bash
git clone <your-repo-url>
cd "UROP webbuild"
npm install
npm run dev
```

Because dependencies are declared in `package.json` and paths are relative, this works identically on any OS with Node installed. `node_modules` and `.next` are git-ignored, so each machine builds its own.

## Available scripts

| Command         | What it does                                        |
| --------------- | --------------------------------------------------- |
| `npm run dev`   | Start the development server on port 3000           |
| `npm run build` | Create an optimized production build                |
| `npm run start` | Serve the production build (run `build` first)      |
| `npm run lint`  | Run ESLint                                          |

## Deploy to Vercel

1. Push this folder to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Next.js — no configuration needed. Click **Deploy**.

Alternatively, with the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm i -g vercel
vercel
```

## Project structure

```
UROP webbuild/
├── app/
│   ├── globals.css     # Theme tokens, palette, animations, Tailwind import
│   ├── layout.tsx      # Root layout & metadata
│   └── page.tsx        # Assembles all sections
├── components/         # NavBar, Hero, Framework, LaborSites, LaborTypes,
│                       #   LaborAllocation, FlowDiagram, Archive, PaperDrawer,
│                       #   Conclusion, Footer, Reveal
├── lib/
│   └── data.ts         # 31-paper dataset + taxonomy definitions + palette
├── public/
│   └── ai-filmmaking-corpus.csv
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

Page content is composed in `app/page.tsx`; the research data all lives in `lib/data.ts`.

> **Note on `npm install`:** dependencies include a platform-specific compiler binary (Next.js SWC). `npm install` fetches the right one for whatever OS you clone onto, so the project stays fully portable across macOS, Linux, and Windows.
