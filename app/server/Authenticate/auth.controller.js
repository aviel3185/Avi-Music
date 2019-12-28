const jwt = require('jsonwebtoken');

getToken = (req, res) => {
    const token = jwt.sign(req.user, process.env.SECRET);
    res.json(token);
}

isAdmin = (req, res) => {
    const { user } = req;
    const admins = process.env.ADMINS.split(',');
    const isAdmin = admins.includes(user);
    res.json(isAdmin);
}

module.exports = {
    getToken,
    isAdmin
}