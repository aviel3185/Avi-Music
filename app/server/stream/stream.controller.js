const { Readable } = require('stream');
const { readSong } = require('./stream.service');
const fs = require('fs');
const util = require('util');
const readfile = util.promisify(fs.readFile);
var title = 'עצי כסף.mp3';
async function getSong(req, res) {
    // res.set('Content-Length', 200);
    res.set('content-type', 'audio/mp3');
    // console.log(res);
    // res.set('Accept-Ranges', 'none');
    console.log(title);
    // fs.createReadStream(process.env.SONGS_PATH + '/' + title).pipe(res);
    // res.end();
}

updateStream = (req, res) => {
    title = Object.keys(req.body)[0].replace('{"title":"', "").replace('"}', "");
    // console.log(title);
    res.status(200).json('done');
}

module.exports = {
    getSong,
    updateStream
}