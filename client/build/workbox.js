export default {
    swDest: 'service-worker.js',
    clientsClaim: true,
    skipWaiting: true,
    navigateFallback: '/index.html',
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'ocula-fonts'
            }
        },
        {
            urlPattern: /.*fontawesome\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'ocula-fonts'
            }
        }
    ]
};