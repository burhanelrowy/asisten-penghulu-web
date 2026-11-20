const CACHE_NAME = "asisten-penghulu-v5.2.1";
const SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/assets/css/app.css",
  "/assets/css/modules/nasihat.css",
  "/assets/css/modules/khutbah.css",
  "/assets/css/modules/akad.css",
  "/assets/css/modules/wali.css",
  "/assets/js/app-core.js",
  "/assets/js/pwa.js",
  "/assets/js/data/wali-data.js",
  "/assets/js/data/mahar-data.js",
  "/assets/js/data/khutbah-data.js",
  "/assets/js/data/nasihat-data.js",
  "/assets/js/data/bank-nasehat.js",
  "/assets/js/data/knowledge.js",
  "/assets/fonts/AsistenNaskh.ttf",
  "/assets/icons/icon.svg",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png",
  "/pages/wali.html",
  "/pages/iddah.html",
  "/pages/mahar.html",
  "/pages/akad.html",
  "/pages/khutbah.html",
  "/pages/nasihat.html",
  "/pages/konversi.html",
  "/pages/ensiklopedia.html",
  "/pages/referensi.html"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      return response;
    }).catch(async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const url = new URL(request.url);
      url.search = "";
      const basePage = await caches.match(url.toString());
      return basePage || caches.match("/index.html");
    }));
    return;
  }
  event.respondWith(caches.match(request).then(cached => {
    if (cached) return cached;
    return fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    });
  }));
});
