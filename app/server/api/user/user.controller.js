const User = require('./user.model');


getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        const mapped = users.map(user => {
            const { username, isAdmin } = user;
            return { username, isAdmin };
        });
        res.json(mapped);
    } catch (err) {
        console.log(err);
        res.status(500).json('Failed to get Users');
    }
}

setAdmins = async (req, res) => {
    const { users } = req.body;
    users.forEach(async (user) => {
        try {
            await User.updateOne({ username: user.username }, { '$set': { isAdmin: user.isAdmin } });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
    );
    res.json('success');

}

isAdmin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user });
        res.json(user.isAdmin);
    } catch (err) {
        console.log(err);
        res.status(500).json(false);
    }
}

module.exports = {
    getUsers,
    setAdmins,
    isAdmin
}