// Offline cache: app files are served from cache at once and refreshed in the background,
// so a new version shows up on the next launch.
const CACHE = "ppp-v2";
const SHELL = [
  "./", "index.html", "manifest.webmanifest", "config.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"
];
const CACHED_HOSTS = ["www.gstatic.com", "fonts.googleapis.com", "fonts.gstatic.com"];

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
