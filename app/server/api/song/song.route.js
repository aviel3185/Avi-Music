const { getSongs, getFavoriteSongs } = require("./song.controller");

module.exports = (app) => {
    app.route('/api/songs')
        .get(getSongs);
    app.route('/api/songs/favorite')
        .get(getFavoriteSongs);
}