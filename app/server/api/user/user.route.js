const { getUsers, setAdmins, isAdmin } = require('./user.controller');
module.exports = (app) => {
    app.route('/api/users')
        .get(getUsers)
        .put(setAdmins);
    app.route('/api/isAdmin')
        .get(isAdmin);
}