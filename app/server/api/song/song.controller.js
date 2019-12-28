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

async function getRandomSong(req, res) {
    try {
        const songs = await getAll();
        const song = songs[Math.floor(Math.random() * songs.length)];
        res.json(song);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
}

getFavoriteSongs = (req, res) => {

}

postSong = (req, res) => {
    const song = req.files.fileKey;
    song.mv(process.env.SONGS_PATH + '/' + song.name, (err) => {
        if (err) {
            res.status(500).json({ message: 'Could not complete Operation at postSong' });
        } else {
            res.status(200).json('success');
        }
    });
}

module.exports = {
    getSongs,
    postSong,
    getFavoriteSongs,
    getRandomSong
}