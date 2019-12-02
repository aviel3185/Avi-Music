const { getAll } = require('./songs.service');

async function getSongs(req, res) {
    try {
        const songs = await getAll();
        res.json(songs);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}

getFavoriteSongs = (req, res) => {

}


module.exports = {
    getSongs,
    getFavoriteSongs
}