const { getToken } = require('./auth.controller');

module.exports = (app) => {
    app.route('/authenticate')
        .get(getToken);
}