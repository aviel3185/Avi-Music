require('dotenv').config();
const bodyParser = require('body-parser');
const app = require('express')();
const http = require('./app/server/socket-io')(app);
const song = require('./app/server/api/song/song.route');
const streaming = require('./app/server/stream/stream.route');
app.use(bodyParser.urlencoded({ extended: true }));
// const ntlm = require('express-ntlm');
// app.use(ntlm());
// app.get('/*', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     console.log(req.ntlm.UserName);
//     res.status(200);
//     next();
// })
song(app);
streaming(app);
try {
    http.listen(3000, () => console.log('We are up!'));
}
catch (err) {
    console.log(err);
}