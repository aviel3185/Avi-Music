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
const ntlm = require('express-ntlm');
app.use('/authenticate', (req, res, next) => {
    res.json(req.ntlm);
    next();
})
song(app);
streaming(app);
try {
    http.listen(3000, () => console.log('We are up!'));
}
catch (err) {
    console.log(err);
}