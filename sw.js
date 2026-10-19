// Offline cache. The page and the app's own scripts come from the network first (so updates apply at once)
// and fall back to the cache offline; other files are served from cache and refreshed in the background.
const CACHE = "ppp-v7";
const SHELL = [
  "./", "index.html", "manifest.webmanifest", "config.js", "content.js", "listening.js", "extra.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js",
  "https://cdnjs.cloudflare.com/ajax/libs/abcjs/6.4.4/abcjs-basic-min.js"
];
const CACHED_HOSTS = ["www.gstatic.com", "cdnjs.cloudflare.com", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => {})))));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !CACHED_HOSTS.includes(url.hostname)) return; // Firebase API calls go straight to the network

  const networkFirst = sameOrigin && (req.mode === "navigate" || url.pathname.endsWith(".js") || url.pathname.endsWith("/manifest.webmanifest") || url.pathname.endsWith("/index.html"));
  if (networkFirst) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await fetch(req, { cache: "no-store" });
        if (res && res.ok) cache.put(req.mode === "navigate" ? "index.html" : req, res.clone());
        return res;
      } catch (err) {
        return (await cache.match(req, { ignoreSearch: true })) || (await cache.match("index.html"));
      }
    })());
    return;
  }

  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: req.mode === "navigate" }) ||
                   (req.mode === "navigate" ? await cache.match("index.html") : undefined);
    const network = fetch(req).then((res) => {
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
      return res;
    }).catch(() => cached);
    if (cached) { e.waitUntil(network); return cached; }
    return network;
  })());
});
