const express = require('express');
const cors = require('cors');
const path = require('path');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const app = express();
const PORT = 3000;

// Browser singleton — เปิดครั้งเดียว ใช้ซ้ำทุก request
let browserInstance = null;
async function getBrowser() {
  if (browserInstance && browserInstance.connected) return browserInstance;
  browserInstance = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  browserInstance.on('disconnected', () => { browserInstance = null; });
  return browserInstance;
}

// Block types ที่ไม่จำเป็น
const BLOCKED_TYPES = new Set(['image', 'media', 'font', 'stylesheet']);
const BLOCKED_HOSTS = ['google-analytics', 'googletagmanager', 'doubleclick', 'facebook'];


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock data ใช้ format เดียวกับ Mercari API จริง
const MOCK_ITEMS = [
  {
    id: 'm17544679761',
    sellerId: '410802211',
    status: 'ITEM_STATUS_ON_SALE',
    name: 'にじさんじ バレンタイン 缶バッジ 甲斐田晴',
    price: '2399',
    created: '1772721517',
    thumbnails: ['https://static.mercdn.net/thumb/item/webp/m17544679761_1.jpg?1772721517'],
    itemConditionId: '1',
  },
  {
    id: 'm45190190687',
    sellerId: '739913746',
    status: 'ITEM_STATUS_ON_SALE',
    name: 'ギルドデザイン 充電クレードル(ブルー)',
    price: '1000',
    created: '1772721521',
    thumbnails: ['https://static.mercdn.net/thumb/item/webp/m45190190687_1.jpg?1772721521'],
    itemConditionId: '4',
    itemBrand: { id: '27589', name: 'GILD design' },
  },
  {
    id: 'm69259590522',
    sellerId: '706202354',
    status: 'ITEM_STATUS_ON_SALE',
    name: 'スヌーピー ネームタグキーホルダー 2点セット',
    price: '666',
    created: '1772721521',
    thumbnails: ['https://static.mercdn.net/thumb/item/webp/m69259590522_1.jpg?1772721521'],
    itemConditionId: '1',
  },
  {
    id: 'm73573755768',
    sellerId: '917225176',
    status: 'ITEM_STATUS_ON_SALE',
    name: 'ゴールデンカムイ 歩み アクリルカード 缶バッジ 鯉登 月島 ジャンフェス',
    price: '2800',
    created: '1772721519',
    thumbnails: ['https://static.mercdn.net/thumb/item/webp/m73573755768_1.jpg?1772721519'],
    itemConditionId: '1',
  },
  {
    id: 'm75792217030',
    sellerId: '986519600',
    status: 'ITEM_STATUS_ON_SALE',
    name: '乃木坂 ビジュアルカードセットB ビリヤニ',
    price: '2200',
    created: '1772721518',
    thumbnails: ['https://static.mercdn.net/thumb/item/webp/m75792217030_1.jpg?1772721518'],
    itemConditionId: '1',
  },
  {
    id: 'm94754981988',
    sellerId: '677705835',
    status: 'ITEM_STATUS_ON_SALE',
    name: 'ヒロアカ 一番くじ H賞 ちょこのっこフィギュア 3種',
    price: '600',
    created: '1772244100',
    thumbnails: ['https://static.mercdn.net/thumb/item/webp/m94754981988_1.jpg?1772244100'],
    itemConditionId: '1',
    auction: { bidDeadline: '2026-03-06T11:33:49Z', totalBid: '1', highestBid: '600', initialPrice: '500' },
  },
  {
    id: 'm90269592033',
    sellerId: '687078286',
    status: 'ITEM_STATUS_ON_SALE',
    name: 'MTG ユートロムの武人、クランゲ/ 通常 日本語1枚 TMT',
    price: '2600',
    created: '1772721534',
    thumbnails: ['https://static.mercdn.net/thumb/item/webp/m90269592033_1.jpg?1772721534'],
    itemConditionId: '3',
  },
  {
    id: 'm75350260735',
    sellerId: '590731003',
    status: 'ITEM_STATUS_ON_SALE',
    name: 'ミルボン エルジューダ エクストラリペアミルキーセラム 120ml',
    price: '2570',
    created: '1772721522',
    thumbnails: ['https://static.mercdn.net/thumb/item/webp/m75350260735_1.jpg?1772721522'],
    itemConditionId: '1',
    itemBrand: { id: '3221', name: 'MILBON' },
  },
];

// ฟังก์ชัน scrape ผ่าน Puppeteer — ดัก network response จาก entities:search
async function scrapeMercari(keyword = '', pageToken = '') {
  const params = new URLSearchParams({ keyword, status: 'on_sale' });
  if (pageToken) params.set('page_token', pageToken);
  const searchUrl = `https://jp.mercari.com/search?${params}`;

  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    // Block resources ที่ไม่จำเป็น
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (BLOCKED_TYPES.has(req.resourceType()) || BLOCKED_HOSTS.some((h) => req.url().includes(h))) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // ดัก response จาก entities:search
    const apiData = await new Promise(async (resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Timeout waiting for API response')), 20000);

      page.on('response', async (response) => {
        if (response.url().includes('/v2/entities:search')) {
          try {
            const json = await response.json();
            clearTimeout(timer);
            resolve(json);
          } catch (e) {
            // ถ้า parse ไม่ได้ ข้ามไป
          }
        }
      });

      page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => {});
    });

    return apiData;
  } finally {
    await page.close();
  }
}

// Transform ข้อมูลจาก Mercari API response — ใช้ field ตรงๆ จาก API
function transformMercariItems(apiData) {
  const items = apiData?.items || [];
  return items.map((item) => ({
    id: item.id,
    sellerId: item.sellerId,
    status: item.status,
    name: item.name,
    price: item.price,                      // string เช่น "2399"
    created: item.created,                  // unix timestamp string
    thumbnails: item.thumbnails || [],      // array of URLs
    itemConditionId: item.itemConditionId,  // "1"–"6"
    itemBrand: item.itemBrand || null,
    auction: item.auction || null,
  }));
}

// SSE streaming endpoint
app.get('/api/search/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const { keyword = '', page_token = '', mock = 'false' } = req.query;
  const send = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  if (mock === 'true') {
    const items = keyword
      ? MOCK_ITEMS.filter((i) => i.name.toLowerCase().includes(keyword.toLowerCase()))
      : MOCK_ITEMS;
    send('meta', { source: 'mock', total: String(items.length), nextPageToken: null, previousPageToken: null });
    for (const item of items) {
      send('item', item);
      await delay(80);
    }
    send('done', {});
    return res.end();
  }

  try {
    console.log(`[Stream] Fetching Mercari... keyword="${keyword}" page_token="${page_token}"`);
    const data = await scrapeMercari(keyword, page_token);
    const items = transformMercariItems(data);
    console.log(`[Stream] Got ${items.length} items`);
    send('meta', {
      source: 'mercari_api',
      total: data.meta?.numFound || String(items.length),
      nextPageToken: data.meta?.nextPageToken || null,
      previousPageToken: data.meta?.previousPageToken || null,
    });
    for (const item of items) {
      send('item', item);
    }
    send('done', {});
  } catch (err) {
    console.warn(`[Stream] Failed (${err.message}), falling back to mock`);
    const items = keyword
      ? MOCK_ITEMS.filter((i) => i.name.toLowerCase().includes(keyword.toLowerCase()))
      : MOCK_ITEMS;
    send('meta', { source: 'mock_fallback', total: String(items.length), nextPageToken: null, previousPageToken: null });
    for (const item of items) {
      send('item', item);
      await delay(80);
    }
    send('done', {});
  }
  res.end();
});

// API endpoint: scrape Mercari
app.get('/api/search', async (req, res) => {
  const { keyword = '', page_token = '', mock = 'false' } = req.query;

  // ถ้าเลือก mock mode
  if (mock === 'true') {
    const filtered = keyword
      ? MOCK_ITEMS.filter((i) => i.name.toLowerCase().includes(keyword.toLowerCase()))
      : MOCK_ITEMS;
    return res.json({ source: 'mock', items: filtered, total: String(filtered.length), nextPageToken: null, previousPageToken: null });
  }

  try {
    console.log(`[Scraper] Fetching Mercari... keyword="${keyword}" page_token="${page_token}"`);
    const data = await scrapeMercari(keyword, page_token);
    const items = transformMercariItems(data);
    console.log(`[Scraper] Got ${items.length} items from Mercari API`);
    res.json({
      source: 'mercari_api',
      items,
      nextPageToken: data.meta?.nextPageToken || null,
      previousPageToken: data.meta?.previousPageToken || null,
      total: data.meta?.numFound || String(items.length),
    });
  } catch (err) {
    console.warn(`[Scraper] API failed (${err.message}), falling back to mock data`);
    const filtered = keyword
      ? MOCK_ITEMS.filter((i) => i.name.toLowerCase().includes(keyword.toLowerCase()))
      : MOCK_ITEMS;
    res.json({
      source: 'mock_fallback',
      items: filtered,
      total: String(filtered.length),
      nextPageToken: null,
      previousPageToken: null,
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
