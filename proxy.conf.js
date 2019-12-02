const Agent = require('agentkeepalive');
module.exports = {
    "/api": {
        "target": "http://localhost:3000",
        "secure": false,
        changeOrigin: true,
        keepAlive: true,
        agent: new Agent({
            maxSockets: 100,
            keepAlive: true,
            maxFreeSockets: 10,
            freeSocketTimeout: 30000,
            timeout: 60000,
            keepAliveMsecs: 300000,

        })
    },
    "/streaming": {
        "target": "http://localhost:3000",
        "secure": false,
        changeOrigin: true,
        agent: new Agent({
            maxSockets: 100,
            keepAlive: true,
            maxFreeSockets: 10,
            freeSocketTimeout: 30000,
            timeout: 60000,
            keepAliveMsecs: 300000,

        })
    }
}