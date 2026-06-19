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

const GENERATED_HEADER = `<!--
  GENERATED FILE — DO NOT EDIT DIRECTLY
  Source     : readme/sections/*.md
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

export function buildReadmeContent() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const parts = [GENERATED_HEADER];

  for (const section of manifest.sections) {
    const sectionPath = path.join(ROOT, section.file);

    if (!fs.existsSync(sectionPath)) {
      throw new Error(`Missing section file: ${section.file}`);
    }

    const raw = fs.readFileSync(sectionPath, 'utf8');
    parts.push(stripSectionDocBlock(raw));
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
