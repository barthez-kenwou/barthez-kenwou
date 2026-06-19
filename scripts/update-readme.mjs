import fs from 'fs';

const README_PATH = 'README.md';
const PROJECTS_PATH = 'data/projects.json';
const PORTFOLIO_BLOG_PATH =
  process.env.PORTFOLIO_BLOG_PATH ||
  'portfolio/src/entities/blogs/api/mock/blog.mocks.ts';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER || 'barthez-kenwou';

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

function statusBadge(project) {
  if (project.status === 'live' && project.url) {
    const domain = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    return `<a href="${project.url}"><img src="https://img.shields.io/badge/LIVE-${encodeURIComponent(domain)}-22C55E?style=for-the-badge&amp;logo=googlechrome&amp;logoColor=white" alt="Live ${domain}"/></a>`;
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

function blogBadge(post, override = {}) {
  const color = override.color || blogBadgeMeta(post).color;
  const logo = override.logo || blogBadgeMeta(post).logo;
  const label = override.label || badgeLabel(post.title);
  const url = `${blogBaseUrl}/${post.slug}`;

  return `<a href="${url}"><img src="https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=for-the-badge&amp;logo=${logo}&amp;logoColor=white" alt="${post.title}"/></a>`;
}

async function githubJson(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'barthez-readme-updater',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} for ${url}`);
  }

  return response.json();
}

const config = JSON.parse(fs.readFileSync(PROJECTS_PATH, 'utf8'));
const blogBaseUrl = config.blogBaseUrl || 'https://barthez-kenwou.dev/blog';
const portfolioRepo = config.portfolioRepo || 'barthez-kenwou-porfolio';
const newArticleDays = config.newArticleDays || 30;

let readme = fs.readFileSync(README_PATH, 'utf8');

for (const project of config.projects) {
  readme = replaceSection(readme, `status-${project.id}`, statusBadge(project));
}

let latestPosts = [];

if (fs.existsSync(PORTFOLIO_BLOG_PATH)) {
  const allPosts = parseBlogPosts(PORTFOLIO_BLOG_PATH);

  if (Array.isArray(config.featuredBlogSlugs) && config.featuredBlogSlugs.length > 0) {
    latestPosts = config.featuredBlogSlugs
      .map((entry) => {
        const slug = typeof entry === 'string' ? entry : entry.slug;
        const post = allPosts.find((item) => item.slug === slug);
        if (!post) return null;
        return typeof entry === 'string' ? post : { ...post, badge: entry };
      })
      .filter(Boolean);
  }

  if (latestPosts.length === 0) {
    latestPosts = allPosts.slice(0, 3);
  }

  console.log(`Resolved ${latestPosts.length} featured blog posts`);
} else {
  console.warn(`Portfolio blog file not found: ${PORTFOLIO_BLOG_PATH}`);
}

const blogHtml =
  latestPosts.length > 0
    ? latestPosts
        .map((post) => blogBadge(post, post.badge || {}))
        .join('\n&nbsp;\n')
    : `<a href="https://barthez-kenwou.dev/blog"><img src="https://img.shields.io/badge/Visit_the_Blog-FF6B35?style=for-the-badge&amp;logo=hashnode&amp;logoColor=white" alt="Visit the blog"/></a>`;

readme = replaceSection(readme, 'blog-latest', blogHtml);

let lastDeploy = 'pending_sync';
let activeRepos = 'N_A';
let prsMonth = 'N_A';

if (GITHUB_TOKEN) {
  try {
    const commits = await githubJson(
      `https://api.github.com/repos/${GITHUB_USER}/${portfolioRepo}/commits?per_page=1`
    );

    if (Array.isArray(commits) && commits[0]?.commit?.committer?.date) {
      lastDeploy = commits[0].commit.committer.date.slice(0, 10);
    }

    const repos = await githubJson(
      `https://api.github.com/search/repositories?q=user:${GITHUB_USER}+fork:false+archived:false`
    );
    activeRepos = String(repos.total_count ?? 'N_A');

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .slice(0, 10);

    const prs = await githubJson(
      `https://api.github.com/search/issues?q=author:${GITHUB_USER}+type:pr+created:>=${monthStart}`
    );
    prsMonth = String(prs.total_count ?? 'N_A');
  } catch (error) {
    console.error('GitHub API warning:', error.message);
  }
}

const now = new Date();
const latestPost = latestPosts[0];
const newestPost = fs.existsSync(PORTFOLIO_BLOG_PATH)
  ? parseBlogPosts(PORTFOLIO_BLOG_PATH)[0]
  : latestPost;
const isNewArticle =
  newestPost &&
  now.getTime() - new Date(newestPost.date).getTime() <=
    newArticleDays * 24 * 60 * 60 * 1000;

const pulseParts = [];

if (isNewArticle && newestPost) {
  pulseParts.push(
    `<a href="${blogBaseUrl}/${newestPost.slug}"><img src="https://img.shields.io/badge/NEW_ARTICLE-22C55E?style=for-the-badge&amp;logo=hashnode&amp;logoColor=white" alt="New article"/></a>`
  );
}

pulseParts.push(
  `<img src="https://img.shields.io/badge/Portfolio_deployed_${lastDeploy}-3B82F6?style=flat-square&amp;logo=vercel&amp;logoColor=white" alt="Last portfolio deploy ${lastDeploy}"/>`
);
pulseParts.push(
  `<img src="https://img.shields.io/badge/Active_repos_${activeRepos}-7C3AED?style=flat-square&amp;logo=github&amp;logoColor=white" alt="Active repositories ${activeRepos}"/>`
);
pulseParts.push(
  `<img src="https://img.shields.io/badge/PRs_this_month_${prsMonth}-FF6B35?style=flat-square&amp;logo=git&amp;logoColor=white" alt="Pull requests this month ${prsMonth}"/>`
);

readme = replaceSection(readme, 'live-pulse', pulseParts.join('\n&nbsp;\n'));

fs.writeFileSync(README_PATH, readme);
console.log('README dynamic sections updated successfully');
