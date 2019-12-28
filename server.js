
try {
    const server = require('./app/server/express');
    server.listen(3000, () => console.log('We are up!'));
}
catch (err) {
    console.log(err);
}