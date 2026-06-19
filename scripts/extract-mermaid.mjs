/**
 * One-time utility: extracts inline ```mermaid blocks from section files
 * into readme/mermaid/ and replaces them with import directives.
 *
 * Usage: node scripts/extract-mermaid.mjs
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const MERMAID_DIR = path.join(ROOT, 'readme/mermaid');

const EXTRACTIONS = [
  {
    section: 'readme/sections/03-case-study-nexus.md',
    diagrams: [
      { file: 'case-studies/nexus-system-architecture.mmd', title: 'NEXUS — System architecture (modular monolith on AWS)' },
      { file: 'case-studies/nexus-tenant-onboarding.mmd', title: 'NEXUS — Tenant onboarding and module activation' },
    ],
  },
  {
    section: 'readme/sections/03-case-study-kaza.md',
    diagrams: [
      { file: 'case-studies/kaza-ecosystem-architecture.mmd', title: 'Kaza — Ecosystem architecture (web, mobile, AI)' },
      { file: 'case-studies/kaza-fraud-detection-pipeline.mmd', title: 'Kaza — AI fraud detection pipeline' },
    ],
  },
  {
    section: 'readme/sections/03-case-study-gta-it.md',
    diagrams: [
      { file: 'case-studies/gta-it-three-tier-architecture.mmd', title: 'GTA IT — 3-tier containerized architecture' },
      { file: 'case-studies/gta-it-content-publishing.mmd', title: 'GTA IT — Content publishing workflow' },
    ],
  },
  {
    section: 'readme/sections/03-case-study-devsecops.md',
    diagrams: [
      { file: 'case-studies/devsecops-pipeline.mmd', title: 'DevSecOps — Industrial multi-environment pipeline' },
      { file: 'case-studies/devsecops-security-policy.mmd', title: 'DevSecOps — Security policy enforcement' },
      { file: 'case-studies/devsecops-artifact-lifecycle.mmd', title: 'DevSecOps — Signed artifact lifecycle' },
    ],
  },
  {
    section: 'readme/sections/03-case-study-linux-hardening.md',
    diagrams: [
      { file: 'case-studies/linux-hardening-defense-in-depth.mmd', title: 'Linux Hardening — Defense-in-depth stack' },
      { file: 'case-studies/linux-hardening-attack-mitigation.mmd', title: 'Linux Hardening — Attack mitigation pipeline' },
      { file: 'case-studies/linux-hardening-ssh-flow.mmd', title: 'Linux Hardening — SSH authentication flow' },
    ],
  },
  {
    section: 'readme/sections/03-case-study-intelek-odoo.md',
    diagrams: [
      { file: 'case-studies/intelek-kubernetes-topology.mmd', title: 'INTELEK — Cloud ERP Kubernetes topology' },
      { file: 'case-studies/intelek-odoo-modules.mmd', title: 'INTELEK — Odoo business modules workflow' },
      { file: 'case-studies/intelek-backup-disaster-recovery.mmd', title: 'INTELEK — Backup and disaster recovery' },
    ],
  },
  {
    section: 'readme/sections/06-reference-architecture.md',
    diagrams: [
      { file: 'reference/full-stack-architecture.mmd', title: 'Reference — Full-stack layered system design' },
      { file: 'reference/cicd-delivery-pipeline.mmd', title: 'Reference — CI/CD delivery pipeline' },
      { file: 'reference/request-lifecycle.mmd', title: 'Reference — Request lifecycle (user to data)' },
    ],
  },
];

function extractMermaidBlocks(content) {
  const pattern = /```mermaid\n([\s\S]*?)```/g;
  const blocks = [];
  let match;

  while ((match = pattern.exec(content)) !== null) {
    blocks.push(match[1].replace(/\s+$/, ''));
  }

  return blocks;
}

function buildMermaidFile(meta, diagram, sectionPath) {
  return [
    `%% File    : readme/mermaid/${meta.file}`,
    `%% Diagram : ${meta.title}`,
    `%% Used in : ${sectionPath}`,
    '%% Note    : Edit this file, then run `node scripts/build-readme.mjs`',
    '',
    diagram,
    '',
  ].join('\n');
}

function buildImportDirective(relativePath) {
  return `<!-- mermaid: ${relativePath} -->`;
}

for (const entry of EXTRACTIONS) {
  const sectionPath = path.join(ROOT, entry.section);
  let content = fs.readFileSync(sectionPath, 'utf8');
  const blocks = extractMermaidBlocks(content);

  if (blocks.length !== entry.diagrams.length) {
    throw new Error(
      `${entry.section}: expected ${entry.diagrams.length} mermaid blocks, found ${blocks.length}`
    );
  }

  entry.diagrams.forEach((meta, index) => {
    const outPath = path.join(MERMAID_DIR, meta.file);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, buildMermaidFile(meta, blocks[index], entry.section));

    const blockPattern = /```mermaid\n[\s\S]*?```/;
    content = content.replace(blockPattern, buildImportDirective(meta.file));
  });

  fs.writeFileSync(sectionPath, content);
}

console.log(`Extracted ${EXTRACTIONS.reduce((n, e) => n + e.diagrams.length, 0)} mermaid diagrams to readme/mermaid/`);
