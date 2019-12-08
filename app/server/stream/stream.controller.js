const fs = require('fs');
let title = '';
getSong = (req, res) => {
    res.status(200)
    try {

        if (title) {
            const path = process.env.SONGS_PATH + '/' + title;
            const stat = fs.statSync(path)
            const fileSize = stat.size
            const range = req.headers.range
            // if (range) {
            //     const parts = range.replace(/bytes=/, "").split("-")
            //     const start = parseInt(parts[0], 10)
            //     const end = parts[1]
            //         ? parseInt(parts[1], 10)
            //         : fileSize - 1
            //     const chunksize = (end - start) + 1
            //     const file = fs.createReadStream(path, { start, end })
            //     const head = {
            //         'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            //         'Accept-Ranges': 'bytes',
            //         'Content-Length': chunksize,
            //         'Content-Type': 'audio/mp3',
            //         'Cache-Control': 'no-cache, no-store, must-revalidate, post- check=0, pre- check=0',
            //         'Pragma': 'no-cache',
            //     }
            //     res.writeHead(206, head);
            //     file.pipe(res);
            // } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'audio/mp3',
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
        }
        // fs.createReadStream(process.env.SONGS_PATH + '/' + title).pipe(res);
    }
    // }
    catch (err) {
        console.log(err);
    }
}

updateStream = (req, res) => {
    try {
        title = req.body.title;
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