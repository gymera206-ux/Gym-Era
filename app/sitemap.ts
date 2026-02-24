import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://gymera.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://gymera.com/shop', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://gymera.com/story', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];
}
