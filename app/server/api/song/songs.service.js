const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);


async function getAll() {
    const songs = await readdir(process.env.SONGS_PATH);
    return songs.filter(song => song.includes('.mp3'));
}

module.exports = {
    getAll
}