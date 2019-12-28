const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: String,
    favorites: [String],
    isAdmin: Boolean
});

module.exports = mongoose.model('User', userSchema);