// Greg's Easter Hunt — Service Worker
// Caches all assets for full offline use

const CACHE_NAME = 'easter-hunt-v1';

const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './gregg_main_page.jpg',
  './blurred_overlay.png',
  './greggeaster.jpg',
  './gregghead.svg',
  './rodrickhead.svg',
  './rawleyhead.svg',
  './mannyhead.svg',
  './egg.svg',
  './page_1.jpg',  './page_2.jpg',  './page_3.jpg',  './page_4.jpg',
  './page_5.jpg',  './page_6.jpg',  './page_7.jpg',  './page_8.jpg',
  './page_9.jpg',  './page_10.jpg', './page_11.jpg', './page_12.jpg',
  './page_13.jpg', './page_14.jpg', './page_15.jpg', './page_16.jpg',
  './page_17.jpg', './page_18.jpg', './page_19.jpg', './page_20.jpg',
];

// Install: cache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
