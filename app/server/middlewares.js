const bodyParser = require('body-parser');
var authMW = require('http-auth');
const User = require('./api/user/user.model');
var basic = authMW.basic({}, (username, password, callback) => {
    callback(true);
});
module.exports = (app, db) => {
    app.use(authMW.connect(basic));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use('/api/isAdmin', async (req, res, next) => {
        const user = await db.collections.users.findOne({ username: req.user });
        if (!user) {
            const user = new User({ username: req.user, favorites: [], isAdmin: false });
            user.save(user).then(t => console.log(t));
        }
        next();
    });
}