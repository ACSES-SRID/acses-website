import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache static assets injected during the build process
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache image files
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        maxEntries: 200, // Updated maxEntries to 200
      }),
    ],
  })
);

// Force the new service worker to take control immediately
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Skip waiting and activate the new SW immediately
});

// Ensure the new service worker takes control of open pages
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const currentCaches = ['image-cache'];
      const cacheNames = await caches.keys();

      // Clear any old cache that isn't part of the updated configuration
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })()
  );
  self.clients.claim(); // Take control of all open pages
});
