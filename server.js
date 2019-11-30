require('dotenv').config();
const bodyParser = require('body-parser')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', socket => {
    socket.on('refresh', () => {
        io.emit('refresh');
    })
})
const song = require('./app/server/api/song/song.route');
const streaming = require('./app/server/stream/stream.route');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
song(app);
streaming(app);
try {
    http.listen(3000, () => console.log('We are up!'));
}
catch (err) {
    console.log(err);
}