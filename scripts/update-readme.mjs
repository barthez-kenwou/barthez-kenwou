import fs from 'fs';

const README_PATH = 'README.md';
const PROJECTS_PATH = 'data/projects.json';
const PORTFOLIO_BLOG_PATH =
  process.env.PORTFOLIO_BLOG_PATH ||
  'portfolio/src/entities/blogs/api/mock/blog.mocks.ts';

function replaceSection(content, name, body) {
  const start = `<!-- README-AUTO-START:${name} -->`;
  const end = `<!-- README-AUTO-END:${name} -->`;
  const pattern = new RegExp(
    `${start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`
  );

  if (!pattern.test(content)) {
    throw new Error(`Missing README markers for section: ${name}`);
  }

  return content.replace(pattern, `${start}\n${body}\n${end}`);
}

function shieldsBadgeText(text) {
  return text.replace(/-/g, '--');
}

function statusBadge(project) {
  if (project.status === 'live' && project.url) {
    const domain = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const badgeText = `LIVE-${shieldsBadgeText(domain)}`;
    return `<a href="${project.url}"><img src="https://img.shields.io/badge/${badgeText}-22C55E?style=for-the-badge&amp;logo=googlechrome&amp;logoColor=white" alt="Live ${domain}"/></a>`;
  }

  if (project.status === 'in_progress') {
    return `<img src="https://img.shields.io/badge/IN_PROGRESS-F59E0B?style=for-the-badge&amp;logo=clockify&amp;logoColor=white" alt="In progress"/>`;
  }

  if (project.status === 'maintenance') {
    return `<img src="https://img.shields.io/badge/MAINTENANCE-64748B?style=for-the-badge&amp;logo=tools&amp;logoColor=white" alt="Maintenance"/>`;
  }

  return `<img src="https://img.shields.io/badge/PLANNED-3B82F6?style=for-the-badge&amp;logo=notion&amp;logoColor=white" alt="Planned"/>`;
}

function parseBlogPosts(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const posts = [];
  const blocks = content.split(/\n  \{/).slice(1);

  for (const block of blocks) {
    const slug = block.match(/"slug":\s*"([^"]+)"/)?.[1];
    const titleEn = block.match(/"titleEn":\s*"((?:[^"\\]|\\.)*)"/s)?.[1];
    const titleFr = block.match(/"titleFr":\s*"((?:[^"\\]|\\.)*)"/s)?.[1];
    const date = block.match(/"date":\s*"([^"]+)"/)?.[1];

    if (!slug || !date) continue;

    const title = (titleEn || titleFr || slug)
      .replace(/\\"/g, '"')
      .replace(/\\n/g, ' ')
      .trim();

    if (!title) continue;

    posts.push({ slug, title, date });
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

function badgeLabel(title) {
  const words = title
    .replace(/[–—]/g, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, 4);

  return words.join('_').toUpperCase().slice(0, 28);
}

function blogBadgeMeta(post) {
  const slug = post.slug.toLowerCase();

  if (/ci-cd|github-actions|pipeline/.test(slug)) {
    return { color: 'FF6B35', logo: 'githubactions' };
  }

  if (/kubernetes|microservice|docker|k8s/.test(slug)) {
    return { color: '7C3AED', logo: 'kubernetes' };
  }

  if (/devsecops|security|sast|dast/.test(slug)) {
    return { color: '22C55E', logo: 'snyk' };
  }

  if (/aws|cloud|finops/.test(slug)) {
    return { color: 'FF9900', logo: 'amazonaws' };
  }

  if (/react|next|frontend|scaling/.test(slug)) {
    return { color: '3B82F6', logo: 'react' };
  }

  return { color: '7C3AED', logo: 'hashnode' };
}

function blogBadge(post, override = {}, blogBaseUrl) {
  const color = override.color || blogBadgeMeta(post).color;
  const logo = override.logo || blogBadgeMeta(post).logo;
  const label = override.label || badgeLabel(post.title);
  const url = `${blogBaseUrl}/${post.slug}`;
  const alt = post.title || label.replace(/_/g, ' ');

  return `<a href="${url}"><img src="https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=for-the-badge&amp;logo=${logo}&amp;logoColor=white" alt="${alt}"/></a>`;
}

function postsFromConfig(featuredBlogSlugs) {
  return featuredBlogSlugs.map((entry) => {
    if (typeof entry === 'string') {
      return { slug: entry, title: entry.replace(/-/g, ' '), badge: {} };
    }

    return {
      slug: entry.slug,
      title: (entry.label || entry.slug).replace(/_/g, ' '),
      badge: entry,
    };
  });
}

const config = JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf8'));
const blogBaseUrl = config.blogBaseUrl || 'https://barthez-kenwou.dev/blog';

let readme = fs.readFileSync(README_PATH, 'utf8');

for (const project of config.projects) {
  readme = replaceSection(readme, `status-${project.id}`, statusBadge(project));
}

let latestPosts = [];

if (Array.isArray(config.featuredBlogSlugs) && config.featuredBlogSlugs.length > 0) {
  if (fs.existsSync(PORTFOLIO_BLOG_PATH)) {
    const allPosts = parseBlogPosts(PORTFOLIO_BLOG_PATH);

    latestPosts = config.featuredBlogSlugs
      .map((entry) => {
        const slug = typeof entry === 'string' ? entry : entry.slug;
        const post = allPosts.find((item) => item.slug === slug);
        if (!post) return null;
        return typeof entry === 'string' ? post : { ...post, badge: entry };
      })
      .filter(Boolean);

    console.log(`Resolved ${latestPosts.length} featured blog posts from portfolio`);
  }

  if (latestPosts.length === 0) {
    latestPosts = postsFromConfig(config.featuredBlogSlugs);
    console.log(`Resolved ${latestPosts.length} featured blog posts from config`);
  }
} else if (fs.existsSync(PORTFOLIO_BLOG_PATH)) {
  latestPosts = parseBlogPosts(PORTFOLIO_BLOG_PATH).slice(0, 3);
  console.log(`Resolved ${latestPosts.length} latest blog posts from portfolio`);
} else {
  console.warn(`Portfolio blog file not found: ${PORTFOLIO_BLOG_PATH}`);
}

const blogHtml =
  latestPosts.length > 0
    ? latestPosts
        .map((post) => blogBadge(post, post.badge || {}, blogBaseUrl))
        .join('\n&nbsp;\n')
    : `<a href="https://barthez-kenwou.dev/blog"><img src="https://img.shields.io/badge/Visit_the_Blog-FF6B35?style=for-the-badge&amp;logo=hashnode&amp;logoColor=white" alt="Visit the blog"/></a>`;

readme = replaceSection(readme, 'blog-latest', blogHtml);

fs.writeFileSync(README_PATH, readme);
console.log('README dynamic sections updated successfully');
