/**
 * Syncs product images from "From Site" folder to public/products and generates
 * lib/products-data.json. Folder names must be: "name - price (sizes)"
 * Each folder should contain images; one file named "main" (e.g. main.jpg) is the main image.
 *
 * Usage: node scripts/sync-products.js [sourceDir]
 * Default source: "C:\\Users\\Dell\\Desktop\\LK Digital Warehouse\\Gym era media\\From Site"
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_SOURCE = 'C:\\Users\\Dell\\Desktop\\LK Digital Warehouse\\Gym era media\\From Site';
const PUBLIC_PRODUCTS = path.join(__dirname, '..', 'public', 'products');
const OUTPUT_JSON = path.join(__dirname, '..', 'lib', 'products-data.json');

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\$/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function slugifyFilename(filename) {
  const ext = path.extname(filename).toLowerCase();
  const base = path.basename(filename, path.extname(filename));
  if (base.toLowerCase() === 'main') return 'main' + ext;
  return slugify(base) + ext;
}

function parseFolderName(folderName) {
  // Format: "name - price (sizes)"  e.g. "Foundation Trainer - $68 (S M L XL)"
  const dashIdx = folderName.lastIndexOf(' - ');
  if (dashIdx === -1) {
    return { name: folderName.trim(), price: '', sizes: '' };
  }
  const name = folderName.slice(0, dashIdx).trim();
  const rest = folderName.slice(dashIdx + 3).trim();
  const openParen = rest.indexOf('(');
  const closeParen = rest.indexOf(')');
  let price = rest;
  let sizes = '';
  if (openParen !== -1 && closeParen > openParen) {
    price = rest.slice(0, openParen).trim();
    sizes = rest.slice(openParen + 1, closeParen).trim();
  }
  return { name, price, sizes };
}

function getImageFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const images = [];
  let mainPath = null;
  for (const e of entries) {
    if (!e.isFile()) continue;
    const ext = path.extname(e.name).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    const base = path.basename(e.name, ext);
    const fullPath = path.join(dir, e.name);
    if (base.toLowerCase() === 'main') {
      mainPath = e.name;
    } else {
      images.push(e.name);
    }
  }
  // Main first, then rest (alphabetically for consistency)
  images.sort();
  const ordered = mainPath ? [mainPath, ...images] : images;
  return ordered;
}

function syncProducts(sourceDir) {
  if (!fs.existsSync(sourceDir)) {
    console.error('Source directory not found:', sourceDir);
    process.exit(1);
  }

  if (!fs.existsSync(PUBLIC_PRODUCTS)) {
    fs.mkdirSync(PUBLIC_PRODUCTS, { recursive: true });
  }

  const dirs = fs.readdirSync(sourceDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const products = [];

  for (const folderName of dirs) {
    const srcFolder = path.join(sourceDir, folderName);
    const imageFiles = getImageFiles(srcFolder);
    if (imageFiles.length === 0) continue;

    const { name, price, sizes } = parseFolderName(folderName);
    const slug = slugify(folderName);
    const destFolder = path.join(PUBLIC_PRODUCTS, slug);

    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder, { recursive: true });
    }

    const imagePaths = [];
    for (const file of imageFiles) {
      const src = path.join(srcFolder, file);
      const safeFile = slugifyFilename(file);
      const dest = path.join(destFolder, safeFile);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        const webPath = `/products/${slug}/${safeFile}`;
        imagePaths.push({ src: webPath, isMain: path.basename(file, path.extname(file)).toLowerCase() === 'main' });
      }
    }

    products.push({
      id: slug,
      name,
      price,
      sizes,
      folderName: slug,
      images: imagePaths,
    });
  }

  const libDir = path.dirname(OUTPUT_JSON);
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(products, null, 2), 'utf8');
  console.log('Synced', products.length, 'products to', PUBLIC_PRODUCTS);
  console.log('Wrote', OUTPUT_JSON);
}

const sourceDir = process.argv[2] || process.env.PRODUCTS_SOURCE || DEFAULT_SOURCE;
syncProducts(path.resolve(sourceDir));
