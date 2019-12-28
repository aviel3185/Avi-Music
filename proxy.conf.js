const Agent = require('agentkeepalive');
require('dotenv').config();

module.exports = {
    '/api': {
        target: process.env.TARGET,
        secure: false,
    },
    '/streaming': {
        target: process.env.TARGET,
        secure: false,
    },
    '/authenticate': {
        target: process.env.TARGET,
        secure: false,
        agent: new Agent({
            maxSockets: 100,
            keepAlive: true,
            maxFreeSockets: 10,
            keepAliveMsecs: 100000,
            timeout: 6000000,
            keepAliveTimeout: 90000
        })
    }
};