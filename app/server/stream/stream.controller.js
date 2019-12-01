const { Readable } = require('stream');
const { readSong } = require('./stream.service');
const fs = require('fs');
const util = require('util');
const readfile = util.promisify(fs.readFile);
var title = 'עצי כסף.mp3';
async function getSong(req, res) {
    res.set('content-type', 'audio/mp3');
    try {
        fs.createReadStream(process.env.SONGS_PATH + '/' + title).pipe(res);
    }
    catch (err) {
        console.log(err);
    }
}

updateStream = (req, res) => {
    try {
        title = Object.keys(req.body)[0].replace('{"title":"', "").replace('"}', "");
        res.status(200).json('success')
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}

module.exports = {
    getSong,
    updateStream
}