const { getSong, updateStream } = require('./stream.controller');

module.exports = (app) => {
    app.route('/streaming')
        .get(getSong)
        .post(updateStream);
}