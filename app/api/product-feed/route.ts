import { NextRequest, NextResponse } from 'next/server';
import products from '@/lib/products-data.json';
import { originalFromDiscounted, parsePrice } from '@/lib/pricing';

/**
 * Meta Commerce Manager product catalog feed.
 *
 * Supports two formats via ?format= query param:
 *   - "xml"  (default) — RSS/XML feed that Meta can ingest on a schedule
 *   - "csv"  — TSV (tab-separated) feed
 *
 * Set up in Meta Commerce Manager → Data Sources → Data Feed → Scheduled Feed
 * URL: https://yourdomain.com/api/product-feed
 *
 * Meta will re-fetch this URL on the schedule you set (hourly/daily),
 * so any new products added to products-data.json will automatically
 * appear in your Instagram Shop after the next fetch.
 */

type Product = {
  id: string;
  name: string;
  price: string;
  sizes: string;
  folderName: string;
  images: { src: string; isMain: boolean }[];
};

function getSiteUrl(req: NextRequest): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  const proto = req.headers.get('x-forwarded-proto') ?? 'https';
  const host = req.headers.get('host') ?? 'localhost:3000';
  return `${proto}://${host}`;
}

function buildFeedItem(product: Product, siteUrl: string) {
  const mainImg = product.images.find((i) => i.isMain) ?? product.images[0];
  const additionalImages = product.images
    .filter((i) => !i.isMain)
    .slice(0, 9); // Meta allows up to 10 additional images

  const sellingPrice = parsePrice(product.price);
  const originalPrice = parsePrice(originalFromDiscounted(product.price));

  return {
    id: product.id,
    title: product.name,
    description: product.sizes
      ? `${product.name} — available in sizes ${product.sizes}. Premium activewear by Gym Era.`
      : `${product.name} — premium activewear by Gym Era.`,
    availability: 'in stock',
    condition: 'new',
    price: `${originalPrice.toFixed(2)} USD`,
    sale_price: `${sellingPrice.toFixed(2)} USD`,
    link: `${siteUrl}/shop`,
    image_link: mainImg ? `${siteUrl}${decodeURIComponent(mainImg.src)}` : '',
    additional_image_link: additionalImages
      .map((img) => `${siteUrl}${decodeURIComponent(img.src)}`)
      .join(','),
    brand: 'Gym Era',
    product_type: 'Apparel & Accessories > Clothing > Activewear',
    google_product_category: '5322',
    size: product.sizes || 'One Size',
  };
}

function toXml(items: ReturnType<typeof buildFeedItem>[], siteUrl: string): string {
  const escXml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const itemsXml = items
    .map(
      (item) => `    <item>
      <g:id>${escXml(item.id)}</g:id>
      <g:title>${escXml(item.title)}</g:title>
      <g:description>${escXml(item.description)}</g:description>
      <g:availability>${item.availability}</g:availability>
      <g:condition>${item.condition}</g:condition>
      <g:price>${item.price}</g:price>
      <g:sale_price>${item.sale_price}</g:sale_price>
      <g:link>${escXml(item.link)}</g:link>
      <g:image_link>${escXml(item.image_link)}</g:image_link>${
        item.additional_image_link
          ? `\n      <g:additional_image_link>${escXml(item.additional_image_link)}</g:additional_image_link>`
          : ''
      }
      <g:brand>${escXml(item.brand)}</g:brand>
      <g:product_type>${escXml(item.product_type)}</g:product_type>
      <g:google_product_category>${item.google_product_category}</g:google_product_category>
      <g:size>${escXml(item.size)}</g:size>
    </item>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Gym Era Product Catalog</title>
    <link>${escXml(siteUrl)}</link>
    <description>Premium activewear by Gym Era</description>
${itemsXml}
  </channel>
</rss>`;
}

function toCsv(items: ReturnType<typeof buildFeedItem>[]): string {
  const headers = [
    'id',
    'title',
    'description',
    'availability',
    'condition',
    'price',
    'sale_price',
    'link',
    'image_link',
    'additional_image_link',
    'brand',
    'product_type',
    'google_product_category',
    'size',
  ];

  const rows = items.map((item) =>
    headers.map((h) => {
      const val = String(item[h as keyof typeof item] ?? '');
      return val.includes('\t') || val.includes('"') || val.includes('\n')
        ? `"${val.replace(/"/g, '""')}"`
        : val;
    }).join('\t'),
  );

  return [headers.join('\t'), ...rows].join('\n');
}

export async function GET(req: NextRequest) {
  const siteUrl = getSiteUrl(req);
  const format = req.nextUrl.searchParams.get('format') ?? 'xml';
  const items = (products as Product[]).map((p) => buildFeedItem(p, siteUrl));

  if (format === 'csv' || format === 'tsv') {
    return new NextResponse(toCsv(items), {
      headers: {
        'Content-Type': 'text/tab-separated-values; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  return new NextResponse(toXml(items, siteUrl), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
