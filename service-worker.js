self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/style.css',
          '/script.js',
          '/index.html',
          '/timer.wav',
          '/timer-10.wav'
        ]
      );
    })
  );
});
