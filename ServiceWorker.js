const cacheName = "Chintan_Vadgama_Products-CV_VFX_Demo-0.14";
const contentToCache = [
    "Build/12156a0cec5da248f35cf215d06334a4.loader.js",
    "Build/30d797330ffb0365a8154160cafc8b59.framework.js.unityweb",
    "Build/4225c0627cbc988c417344a5e8ab16e7.data.unityweb",
    "Build/119abf4fe26e63cb6f6072fffc743601.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
