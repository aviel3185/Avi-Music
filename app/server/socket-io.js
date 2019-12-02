
module.exports = (app) => {
    const http = require('http').Server(app);
    const io = require('socket.io')(http);

    io.on('connection', socket => {
        socket.on('play', (data) => {
            io.emit('play', data.title);
            console.log(data.title);
        })
        socket.on('stop', () => {
            io.emit('stop');
        })
    })
    return http;
};