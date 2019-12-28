require('dotenv').config();
const app = require('express')();

const db = require('./mongoose');
require('./middlewares')(app, db);
require('./routes')(app);
const server = require('./socket-io')(app);

module.exports = server;