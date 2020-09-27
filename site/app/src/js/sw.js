/* global fetch self caches */
var cacheName = 'ficus-site-cache'
var filesToCache = [
  '/',
  '/index.html',
  '/css/scribbler-doc.css',
  '/css/scribbler-global.css',
  '/css/scribbler-landing.css',
  '/css/darcula.css',
  '/js/highlight.pack.js',
  '/js/scribbler.js',
  '/img/angle_up.svg',
  '/img/checkmark.svg',
  '/img/logo.svg'
]

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell')
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return response || fetch(event.request)
    })
  )
})
