'use strict';
const cacheName = 'hello-pwa';
const filesToCache = [
  './',
  './index.html',
  './css/font.css',
  './css/style.css',
  './js/main.js',
  './fonts/Roboto-Regular-wenfont.woff',
  './images/pwa.png',
  './images/wifi-solid.svg',
];

// Start the service worker and cache all of the app's content
self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(cacheName);
        return cache.addAll(filesToCache);
      } catch (error) {
        console.log('wait until', error.message);
      }
    })()
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', (e) => {
  e.respondWith(
    (async () => {
      try {
        const response = await caches.match(e.request);
        return response || fetch(e.request);
      } catch (error) {
        console.log('fetch', error);
      }
    })()
  );
});
