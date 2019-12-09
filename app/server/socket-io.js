
module.exports = (app) => {
    const http = require('http').Server(app);
    const io = require('socket.io')(http);
    var titl = '';
    var volume = 0.5;
    io.on('connection', socket => {
        //On connection decided if to play the current song
        if (titl !== '') {
            socket.emit('play', titl, volume);
        } else {
            socket.emit('volume', volume);
        }
        
        socket.on('play', (data) => {
            titl = data.title;
            io.emit('play', data.title, volume);
        });
        socket.on('stop', () => {
            titl = '';
            io.emit('stop');
        });
        socket.on('ended', () => {
            io.emit('stop');
        });
        socket.on('volume', (vol) => {
            volume = vol;
            io.emit('volume', vol);
        });
        socket.on('rewind', () => {
            io.emit('rewind');
        });
        socket.on('pause', () => {
            io.emit('pause');
        });
        socket.on('unpause', () => {
            io.emit('unpause');
        })
    })
    return http;
};