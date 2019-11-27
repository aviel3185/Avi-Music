const { Readable } = require('stream');
const { readSong } = require('./stream.service');
const fs = require('fs');
const util = require('util');
const readfile = util.promisify(fs.readFile);
var title = 'עצי כסף.mp3';
async function getSong(req, res) {

        res.set('content-type', 'audio/mp3');
    fs.createReadStream(process.env.SONGS_PATH + '/' + title).pipe(res);
}

updateStream = (req, res) => {
    console.log(req.body);
    title = Object.keys(req.body)[0].replace('{"title":"',"").replace('"}',"");
    res.status(200).json('done');
}

module.exports = {
    getSong,
    updateStream
}