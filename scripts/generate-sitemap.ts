import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { menuRouteMeta } from '../constants/routeMeta';
import { getAllCategoryEntries } from '../constants/categoryIndex';
import { kaomojiData } from '../constants/kaomoji';
import { createKaomojiSlug } from '../utils/slug';
import { SITE_URL as DEFAULT_SITE_URL } from '../constants/site';

type ChangeFrequency = 'daily' | 'weekly' | 'monthly';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: ChangeFrequency;
  priority: number;
}

const SITE_URL = (process.env.SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, '');

const now = new Date().toISOString();
const entries = new Map<string, SitemapEntry>();

const toAbsoluteUrl = (pathname: string): string => {
  const normalizedPath = pathname === '/' ? '/' : `/${pathname.replace(/^\/+/, '')}`;
  return `${SITE_URL}${normalizedPath}`;
};

const addEntry = (pathname: string, priority: number, changefreq: ChangeFrequency) => {
  const loc = toAbsoluteUrl(pathname);
  entries.set(loc, {
    loc,
    lastmod: now,
    changefreq,
    priority,
  });
};

menuRouteMeta.forEach((route) => {
  const pathSegment = route.index ? '/' : `/${route.path}`.replace(/\/+/, '/');
  const priority = route.index ? 1.0 : 0.8;
  const changefreq: ChangeFrequency = route.index ? 'daily' : 'weekly';
  addEntry(pathSegment, priority, changefreq);
});

const categoryEntries = getAllCategoryEntries();
categoryEntries.forEach((entry) => {
  addEntry(path.posix.join('category', entry.slug), 0.7, 'weekly');
});

kaomojiData.forEach((topCategory) => {
  topCategory.subCategories.forEach((subCategory) => {
    subCategory.kaomojis.forEach((kaomoji) => {
      const slug = createKaomojiSlug(kaomoji);
      addEntry(path.posix.join('kaomoji', slug), 0.5, 'monthly');
    });
  });
});

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const xmlBody = Array.from(entries.values())
  .sort((a, b) => a.loc.localeCompare(b.loc))
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlBody}
</urlset>
`;

const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outputPath, xml, 'utf8');
console.log(`Generated sitemap with ${entries.size} entries at ${outputPath}`);
