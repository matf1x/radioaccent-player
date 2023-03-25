self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then(async (cache) => {
      // Which files does neet to be cached?
      assets = [
        "./index.html",
        "./offline.html",
        "./manifest.json",
        "./scripts/main.js",
        "./scripts/init.js",
        "./scripts/config.js",
        "./dist/css/style.css",
        "./assets/img/logo.png",
        "./assets/img/logo.webp",
      ];

      // Try to cache all, if that doesn't work, cache one by one to find the issue
      try {
        ok = await cache.addAll(assets);
      } catch (err) {
        console.error("sw: cache.addAll");
        for await (let i of assets) {
          try {
            ok = await cache.add(i);
          } catch (err) {
            console.warn("sw: cache.add", i);
          }
        }
      }

      return ok;
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
