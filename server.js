require('dotenv').config();
const bodyParser = require('body-parser')
const app = require('express')();
const song = require('./app/server/api/song/song.route');
const streaming = require('./app/server/stream/stream.route');
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(bodyParser.json());
song(app);
streaming(app);
try {
    app.listen(3000, () => console.log('We are up!'));
}
catch (err) {
    console.log(err);
}