module.exports = (app) => {
    require('./api/song/song.route')(app);
    require('./stream/stream.route')(app);
    require('./Authenticate/auth.route')(app);
    require('./api/user/user.route')(app);
}