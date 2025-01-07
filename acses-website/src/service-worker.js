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
        maxEntries: 50, // Limit cache to 50 images
      }),
    ],
  })
);

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
