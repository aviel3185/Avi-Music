const { getAll } = require('./songs.service');

async function getSongs(req, res) {
    const songs = await getAll();
    res.json(songs);
}

getFavoriteSongs = (req, res) => {

}


module.exports = {
    getSongs,
    getFavoriteSongs
}