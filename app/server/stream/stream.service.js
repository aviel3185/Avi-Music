const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

async function readSong(title) {
    const song = await readFile(process.env.SONGS_PATH + '/' + title);
    return song;
}

module.exports = { readSong };