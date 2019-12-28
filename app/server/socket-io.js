
module.exports = (app) => {
    const http = require('http').Server(app);
    const io = require('socket.io')(http);
    const socketioJwt = require("socketio-jwt");
    let currentlyConnected = 0;
    let title = '';
    var volume = 0.5;
    let id;

    // io.use(socketioJwt.authorize({
    //     secret: process.env.SECRET,
    //     handshake: true,
    //     timeout: 1000
    // }));
    // const auth = socketioJwt.authorize({
    //     secret: process.env.SECRET,
    //     handshake: true,
    //     timeout: 15000
    // });
    io.on('connection', socket => {
        currentlyConnected += 1;
        io.emit('updatedCount', currentlyConnected);
        //On connection decided if to play the current song
        if (title !== '') {
            socket.emit('play', title, id, volume);
        } else {
            socket.emit('volume', volume);
        }

        socket.on('disconnect', () => {
            currentlyConnected -= 1;
            io.emit('updatedCount', currentlyConnected);
        })

        socket.on('play', (data) => {
            title = data.title;
            id = data.id;
            io.emit('play', data.title, id, volume);
        });
        socket.on('stop', () => {
            title = '';
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
        });
    });

    return http;
};