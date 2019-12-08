const { getSongs, getFavoriteSongs, getRandomSong, postSong } = require("./song.controller");
const fileUpload = require('express-fileupload');

module.exports = (app) => {
    app.use('/api/songs', fileUpload({
        createParentPath: true
    }));
    app.route('/api/songs')
        .get(getSongs)
        .post(postSong);
    app.route('/api/songs/favorite')
        .get(getFavoriteSongs);
    app.route('/api/songs/random')
        .get(getRandomSong);
}