const mongoose = require('mongoose');
const dbPath = process.env.DB_PATH;
mongoose.connect(dbPath, { useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db; 