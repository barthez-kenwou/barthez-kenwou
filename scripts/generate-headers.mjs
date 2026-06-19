import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'headers');
mkdirSync(out, { recursive: true });

const section = (id, title, bg, accent = '#FFFFFF') => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="44" viewBox="0 0 900 44" role="img" aria-label="${title}">
  <rect width="900" height="44" rx="6" fill="${bg}"/>
  <rect x="0" y="20" width="900" height="2" fill="${accent}" opacity="0.35"/>
  <text x="450" y="28" text-anchor="middle" fill="${accent}" font-size="17" font-family="Segoe UI, system-ui, sans-serif" font-weight="600" letter-spacing="0.5">${title}</text>
</svg>`;

const pill = (id, label, bg) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="50" viewBox="0 0 280 50" role="img" aria-label="${label}">
  <rect width="280" height="50" rx="6" fill="${bg}"/>
  <text x="140" y="32" text-anchor="middle" fill="#FFFFFF" font-size="28" font-family="Segoe UI, system-ui, sans-serif" font-weight="700">${label}</text>
</svg>`;

const sections = [
  ['section-what-i-craft', 'What I Craft', '#0F172A', '#FFFFFF'],
  ['section-signature-projects', 'Signature Projects', '#1E1B4B', '#FFFFFF'],
  ['section-tech-arsenal', 'Tech Arsenal', '#0F172A', '#FFFFFF'],
  ['section-certifications', 'Certifications and Credentials', '#7C3AED', '#FFFFFF'],
  ['section-pipeline', 'The Pipeline I Live By', '#0F172A', '#FFFFFF'],
  ['section-github-pulse', 'GitHub Pulse', '#1E1B4B', '#FFFFFF'],
  ['section-soft-skills', 'Soft Skills', '#FF6B35', '#FFFFFF'],
  ['section-cta', "Let's Build Something Bold", '#0F172A', '#FFFFFF'],
  ['section-quote', 'Daily Dev Quote', '#1E1B4B', '#FFFFFF'],
];

for (const [file, title, bg, accent] of sections) {
  writeFileSync(join(out, `${file}.svg`), section(file, title, bg, accent));
}

const pills = [
  ['pill-build', 'BUILD', '#FF6B35'],
  ['pill-ship', 'SHIP', '#7C3AED'],
  ['pill-scale', 'SCALE', '#3B82F6'],
];

for (const [file, label, bg] of pills) {
  writeFileSync(join(out, `${file}.svg`), pill(file, label, bg));
}

writeFileSync(join(out, 'pipeline-tagline.svg'), `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="30" viewBox="0 0 760 30" role="img" aria-label="automated secure measurable repeatable">
  <defs>
    <linearGradient id="tagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="50%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#FF6B35"/>
    </linearGradient>
  </defs>
  <rect width="760" height="30" rx="5" fill="url(#tagGrad)"/>
  <text x="380" y="20" text-anchor="middle" fill="#FFFFFF" font-size="12" font-family="Segoe UI, system-ui, sans-serif" letter-spacing="1">automated · secure · measurable · repeatable</text>
</svg>`);

writeFileSync(join(out, 'footer.svg'), `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="90" viewBox="0 0 900 90" role="img" aria-label="Thanks for visiting">
  <defs>
    <linearGradient id="footGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF6B35"/>
      <stop offset="50%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <rect width="900" height="90" rx="8" fill="url(#footGrad)"/>
  <text x="450" y="52" text-anchor="middle" fill="#FFFFFF" font-size="14" font-family="Segoe UI, system-ui, sans-serif">Thanks for visiting — let's connect and create something extraordinary.</text>
</svg>`);

console.log('Headers generated in assets/headers/');
