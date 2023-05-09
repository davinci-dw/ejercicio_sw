self.addEventListener('install', event => {
    console.log("SW: instalando el service worker");
    const instalacion = new Promise(async (resolve, reject) => {
        //aca instalo las cosas
        const cache = await caches.open('cache-1');
        await cache.addAll([
            'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
            '/assets/fondo.jpg',
            '/assets/pwa.png',
            '/assets/style.css',
            'index.html',
        ]);
        await self.skipWaiting();
        resolve();
    });
    event.waitUntil(instalacion);
});

self.addEventListener('fetch', event => {
    if(
        event.request.url.includes('.html') ||
        event.request.url.includes('fondo.jpg') ||
        event.request.url.includes('bootstrap.min.css') ||
        event.request.url.includes('style.css')){
        //const respuesta = fetch('/assets/fondo.jpg'); //devuelvo descarga del sw
        //event.respondWith(respuesta);
        event.respondWith(
            (async function() {
                const cache = await caches.open('cache-1');
                const respuesta = await cache.match(event.request);
                if(respuesta) return respuesta;
            })()
        );

    }
});