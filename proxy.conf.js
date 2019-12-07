const Agent = require('agentkeepalive');

module.exports = {
    '/api': {
        target: 'http://localhost:3000',
        secure: false,
    },
    '/streaming': {
        target: 'http://localhost:3000',
        secure: false,
    },
    '/authenticate': {
        target: 'http://localhost:3000',
        secure: false,
        agent: new Agent({
            maxSockets: 100,
            keepAlive: true,
            maxFreeSockets: 10,
            keepAliveMsecs: 100000,
            timeout: 6000000,
            keepAliveTimeout: 90000
        }),
        onProxyRes: proxyRes => {
            let key = 'www-authenticate';
            proxyRes.headers[key] = proxyRes.headers[key] &&
                proxyRes.headers[key].split(',');
        }
    }
};