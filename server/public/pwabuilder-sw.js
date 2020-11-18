const CACHE = "pages-cache-v1";

const filesToCache = [
  '/',
  'stylesheets/normalize.css',
  'stylesheets/app.css',
  'stylesheets/city.css',
  'js/city.js',
  'images/geolocation-icon.png',
  'offline.html'
];

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', event => {
  console.log('fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request).then(response => {
        // TODO 5 - Respond with custom 404 page
        return caches.open(CACHE).then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      });
    })
    .catch(error => {
      console.log('caches error ', error);
      return caches.match('offline.html');
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheAllowlist = [CACHE];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});