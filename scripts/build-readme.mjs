/**
 * Assembles README.md from modular section files.
 *
 * GitHub profile READMEs only render the root README.md file.
 * Source of truth for content lives in readme/sections/*.md
 *
 * Usage:
 *   node scripts/build-readme.mjs
 *
 * Workflow:
 *   1. Edit section files under readme/sections/
 *   2. Run this script to regenerate README.md
 *   3. Commit both section files and README.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, 'readme/manifest.json');
const README_PATH = path.join(ROOT, 'README.md');
const MERMAID_DIR = path.join(ROOT, 'readme/mermaid');

const MERMAID_IMPORT_PATTERN = /<!--\s*mermaid:\s*([^\s]+)\s*-->/g;

const GENERATED_HEADER = `<!--
  GENERATED FILE — DO NOT EDIT DIRECTLY
  Source     : readme/sections/*.md + readme/mermaid/*.mmd
  Build      : node scripts/build-readme.mjs
  Auto-sync  : node scripts/update-readme.mjs (updates markers, then rebuilds)
-->

`;

/**
 * Removes the leading section documentation comment block from a partial file.
 * Only strips the first HTML comment if it contains "File        : readme/sections/".
 */
function stripSectionDocBlock(content) {
  const docPattern =
    /^<!--\s*\n(?:[^\n]*\n)*?\s*Note\s*: HTML comments are stripped from the published README\.md output\.\s*\n-->\s*\n?/;

  return content.replace(docPattern, '');
}

/**
 * Strips leading Mermaid documentation lines (%% comments) from source files.
 * Keeps metadata in .mmd files without polluting the published README output.
 */
function stripMermaidDocBlock(diagram) {
  return diagram.replace(/^(?:%%[^\n]*\n)+/, '').trimStart();
}

/**
 * Resolves <!-- mermaid: path/to/file.mmd --> directives into fenced mermaid blocks.
 * Paths are relative to readme/mermaid/.
 */
export function resolveMermaidImports(content) {
  return content.replace(MERMAID_IMPORT_PATTERN, (_, relativePath) => {
    const mermaidPath = path.join(MERMAID_DIR, relativePath);

    if (!fs.existsSync(mermaidPath)) {
      throw new Error(`Missing mermaid file: readme/mermaid/${relativePath}`);
    }

    const raw = fs.readFileSync(mermaidPath, 'utf8').trimEnd();
    const diagram = stripMermaidDocBlock(raw);
    return `\`\`\`mermaid\n${diagram}\n\`\`\``;
  });
}

export function processSectionContent(raw) {
  return resolveMermaidImports(stripSectionDocBlock(raw));
}

export function buildReadmeContent() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const parts = [GENERATED_HEADER];

  for (const section of manifest.sections) {
    const sectionPath = path.join(ROOT, section.file);

    if (!fs.existsSync(sectionPath)) {
      throw new Error(`Missing section file: ${section.file}`);
    }

    const raw = fs.readFileSync(sectionPath, 'utf8');
    parts.push(processSectionContent(raw));
  }

  return parts.join('');
}

export function buildReadme() {
  const content = buildReadmeContent();
  fs.writeFileSync(README_PATH, content);
  return README_PATH;
}

const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  buildReadme();
  console.log(`README.md assembled from ${JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')).sections.length} sections`);
}
