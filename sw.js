self.addEventListener('install', event => {
    console.log("SW: instalando el service worker");
    const instalacion = new Promise(async (resolve, reject) => {
        //aca instalo las cosas
        const cache = await caches.open('cache-1');
        await cache.addAll([
            '/assets/fondo.jpg',
            '/assets/pwa.png',
        ]);
        await self.skipWaiting();
        resolve();
    });
    event.waitUntil(instalacion);
});