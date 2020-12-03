// Cache Storage Name. Can be consider as the version of your web site.
const CACHE = "pages-cache-v3";

// Things that would make your site entirely non-functional if they failed to be fetched, things an equivalent native-app would make part of the initial download.
// Ideal for: CSS, images, fonts, JS, templates… basically anything you'd consider static to that "version" of your site.
const filesToCache = [
  '/stylesheets/normalize.css',
  '/stylesheets/app.css',
  '/stylesheets/city.css',
  '/js/city.js',
  '/images/geolocation-icon.png',
  '/offline.html'
];

// Frequently used files, but not as a dependency.
// Ideal for: Resources that aren't needed straight away.
const frequentlyUsedFiles = [
  '/images/cond_icon/100.png', // Sunny
  '/images/cond_icon/101.png', // Cloudy
];

self.addEventListener('install', event => {
  console.log('installing')
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      // try to cache frequently used file, 
      // but they might not be cached if service worker finished handling events.
      cache.addAll(frequentlyUsedFiles);
      // cache dependecy files, if any of the resources fail to be fetched, the `cache.addAll()` call rejects.
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('fetch event for ', event.request.url);
  // Parse the URL:
  var requestURL = new URL(event.request.url);
  console.log('requestURL:', requestURL);
  // Routing for local URLs
  if (requestURL.origin === location.origin) {
    // Network first and save to cache, always show the latest content for the index/weather page.
    // Read from cache if online.
    if (requestURL.pathname === '/' || /^\/city\//.test(requestURL.pathname)) {
      event.respondWith(
        fetch(event.request).then(response => {
          return caches.open(CACHE).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        }).catch(function () {
          return caches.match(event.request);
        }),
      );
      return;
    }
  }

  // A sensible default pattern
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        //console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      //console.log('Network request for ', event.request.url);
      return fetch(event.request).then(response => {
        console.log('response:', response);
        if (response.type !== 'basic') {
          return response;
        }
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
        cacheNames
          // Return true if you want to remove this cache,
          // but remember that caches are shared across the whole origin
          .filter(cacheName => cacheAllowlist.indexOf(cacheName) === -1)
          // Delete unused caches.
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});
