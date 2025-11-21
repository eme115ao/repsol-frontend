// public/sw.js
const CACHE_VERSION = "v1::repsol";
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/offline.html",
  "/assets/logo.png",
  "/assets/placeholder.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// On install — pre-cache core resources
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

// On activate — clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Helper: is API request?
function isApiRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith("/api/");
}

// Fetch strategy:
// - API calls -> network-first (so data stays fresh), fallback to cache
// - Navigation (HTML) -> network-first, fallback to offline.html
// - Static assets -> cache-first
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Always bypass non-GET
  if (request.method !== "GET") return;

  if (isApiRequest(request)) {
    // network-first for API
    event.respondWith(
      fetch(request)
        .then((resp) => {
          // clone + cache the response if ok
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          return resp;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || new Response(null, { status: 503 }))
        )
    );
    return;
  }

  // HTML navigation requests (including /, /product/...)
  if (request.mode === "navigate" || (request.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          return resp;
        })
        .catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((resp) => {
          if (!resp || resp.status !== 200 || resp.type !== "basic") return resp;
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          return resp;
        })
        .catch(() => {
          // fallback for images
          if (request.destination === "image") return caches.match("/assets/placeholder.png");
          return new Response(null, { status: 504 });
        });
    })
  );
});
