const CACHE_NAME = 'easter-hunt-v6';
const ASSETS = [
  './index.html','./manifest.json','./icon-192.png','./icon-512.png',
  './gregg_main_page.jpg','./blurred_overlay.png','./greggeaster.jpg',
  './greg_with_basket.png','./egg_blue.png','./egg_orange.png',
  './egg_purple.png','./egg_rainbow.png','./egg_cracked.png',
  './hammer.png','./game_bg.png',
  './page_1.jpg','./page_2.jpg','./page_3.jpg','./page_4.jpg',
  './page_5.jpg','./page_6.jpg','./page_7.jpg','./page_8.jpg',
  './page_9.jpg','./page_10.jpg','./page_11.jpg','./page_12.jpg',
  './page_13.jpg','./page_14.jpg','./page_15.jpg','./page_16.jpg',
  './page_17.jpg','./page_18.jpg','./page_19.jpg','./page_20.jpg',
  './Comic1.jpg','./Comic2.jpg','./Comic3.jpg',
  './Comic4.jpg','./Comic5.jpg','./Comic6.jpg',
];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('index.html') || url.pathname.endsWith('/')) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }
  event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
});
