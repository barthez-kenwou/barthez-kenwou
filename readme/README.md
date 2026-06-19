# Profile README — Maintainer Guide

This repository uses a **modular README architecture**. GitHub only renders the root `README.md`, so section files are the editable source of truth.

## Directory layout

```
readme/
├── manifest.json          # Section order and metadata
├── mermaid/               # Mermaid diagram source files (.mmd)
│   ├── manifest.json      # Diagram catalog (file, title, usedIn)
│   ├── case-studies/      # Per-project architecture diagrams
│   └── reference/         # Global reference architecture diagrams
├── sections/              # One file per logical block
│   ├── 00-hero.md
│   ├── 02-signature-projects.md   ← auto-synced (project status badges)
│   ├── 09-blog.md                 ← auto-synced (featured blog badges)
│   └── ...
scripts/
├── build-readme.mjs       # Assembles sections + mermaid imports → README.md
└── update-readme.mjs      # Updates auto markers, then rebuilds
data/
└── projects.json          # Project status + featured blog slugs
```

## Workflow

1. Edit the relevant file under `readme/sections/` and/or `readme/mermaid/`.
2. Run `node scripts/build-readme.mjs` to regenerate root `README.md`.
3. Commit **section files**, **mermaid files**, and `README.md`.

Do **not** edit root `README.md` directly — it is generated and includes a header comment stating this.

## Auto-synced sections

Two sections contain markers managed by `scripts/update-readme.mjs`:

| Marker | File | Source |
|--------|------|--------|
| `status-{id}` | `02-signature-projects.md` | `data/projects.json` → `projects[]` |
| `blog-latest` | `09-blog.md` | Portfolio blog mocks or `featuredBlogSlugs` in config |

The GitHub Action (`.github/workflows/readme-auto-update.yml`) runs daily and on config changes.

## Adding or reordering sections

1. Create or edit a file in `readme/sections/`.
2. Add an entry to `readme/manifest.json` in the desired order.
3. Run `node scripts/build-readme.mjs`.

Each section file should start with an HTML comment block documenting its purpose (stripped from the published README).

## Mermaid diagrams

Diagrams live in `readme/mermaid/` as standalone `.mmd` files. Section files reference them via import directives:

```markdown
**System architecture — modular monolith on AWS**

<!-- mermaid: case-studies/nexus-system-architecture.mmd -->
```

At build time, `scripts/build-readme.mjs` inlines each directive as a fenced ` ```mermaid ` block. Leading `%%` comment lines in `.mmd` files are stripped from the published output (they remain in source for documentation).

| Folder | Purpose |
|--------|---------|
| `mermaid/case-studies/` | Architecture diagrams tied to Deep Dive case studies |
| `mermaid/reference/` | Global reference architecture diagrams |

To add a new diagram:

1. Create `readme/mermaid/{case-studies|reference}/your-diagram.mmd`
2. Add an entry to `readme/mermaid/manifest.json`
3. Place `<!-- mermaid: path/to/your-diagram.mmd -->` in the target section file
4. Run `node scripts/build-readme.mjs`

## GitHub rendering constraints

When editing content, keep these rules in mind:

- No `<style>` blocks inside inline SVGs — use inline `fill` attributes.
- No `<img>` inside `<summary>` elements.
- LIVE badges: encode hyphens in domains as `--` (e.g. `gta--it.com`).
- Mermaid: avoid `&amp;`, raw `&`, and deeply nested `alt` in sequence diagrams.
- shields.io: encode `€` as `%E2%82%AC`; avoid raw `&` in capsule-render text — use `%C2%B7` for middle dots.
