require('dotenv').config();
const bodyParser = require('body-parser');
const app = require('express')();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
const http = require('./app/server/socket-io')(app);
const song = require('./app/server/api/song/song.route');
const streaming = require('./app/server/stream/stream.route');
const db = require('./app/server/mongoose');
const User = require('./app/server/user.model');
app.get('/*', (req, res, next) => {
    req.username = "t_aviel_e";
    const user = new User({ username: req.username, favorites: [] });
    db.collections.users.findOne({ username: req.username }).then(r => {
        console.log(r);
        if (!r) {
            user.save(user).then(t => console.log(t));
        }
        next();
    });
});
song(app);
streaming(app);
try {
    http.listen(3000, () => console.log('We are up!'));
}
catch (err) {
    console.log(err);
}