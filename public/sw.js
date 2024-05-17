const CACHE_NAME = 'v1';
const PRECACHE_ASSETS = [
  '/',
  '/style.css',
  '/events/page',
  '/offline'
];

// Install event - cache the necessary assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })))
        .catch(error => {
          console.error('Failed to cache assets during install:', error);
          throw error; // Re-throw to propagate the error
        });
    })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve cached content and handle network errors
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(networkResponse => {
        // Optionally, update the cache with the network response
        if (networkResponse.ok) {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      }).catch(error => {
        console.error('Fetch failed; returning offline page instead.', error);
        if (event.request.mode === 'navigate') {
          return caches.match('/offline').then(offlineResponse => {
            if (offlineResponse) {
              return offlineResponse;
            }
            return new Response('Offline content is not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
        }
        return new Response('Content not available offline', {
          status: 404,
          statusText: 'Not Found',
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    }).catch(error => {
      console.error('Error in cache match; returning offline page.', error);
      return caches.match('/offline.html').then(offlineResponse => {
        if (offlineResponse) {
          return offlineResponse;
        }
        return new Response('Offline content is not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});
