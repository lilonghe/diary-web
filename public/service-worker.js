var cacheName = 'diary-assets';                
self.addEventListener('install', event => {  
    event.waitUntil(
        caches.open(cacheName)                   
            .then(cache => cache.addAll([
                '/index.html',
                '/index.js',
                '/index_page.js',
                '/list_page.js',
                '/create_page.js',
                '/dist/vendor_e66631eeff9666f4c6c9.js'
            ]))
    );
});

self.addEventListener('fetch', function (event) {
    console.log('listen fetch');
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                console.log('match response ', response);
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});