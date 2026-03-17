import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 45678;

const ROUTES = [
  '/',
  '/fde-wiki',
  '/for-candidates',
  '/for-employers',
  '/partner-program',
];

const MIME_TYPES = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

// Simple static file server with SPA fallback
const server = createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let filePath = join(DIST, url.pathname);

  // Try to serve the file directly
  if (existsSync(filePath) && statSync(filePath).isFile()) {
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(readFileSync(filePath));
    return;
  }

  // SPA fallback — serve index.html for all routes
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(readFileSync(join(DIST, 'index.html')));
});

async function prerender() {
  server.listen(PORT);
  console.log(`Static server running on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();

    // Block heavy assets that aren't needed for content extraction
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const type = req.resourceType();
      if (['image', 'font', 'media'].includes(type)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait a bit for any animations/lazy content to settle
    await page.waitForSelector('#root > *', { timeout: 10000 });

    const html = await page.content();

    // Write the prerendered HTML
    const outDir = route === '/' ? DIST : join(DIST, route);
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);

    await page.close();
    console.log(`Prerendered: ${route}`);
  }

  await browser.close();
  server.close();
  console.log('Prerendering complete!');
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  server.close();
  process.exit(1);
});
