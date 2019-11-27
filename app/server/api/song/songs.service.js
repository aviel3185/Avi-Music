const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);


async function getAll() {
    var songs;
    songs=await readdir(process.env.SONGS_PATH);
    // songs=songs.forEach(song=>song.slice(song.lastIndexOf('.')));
    return songs;
}

module.exports = {
    getAll
}