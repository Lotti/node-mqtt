const debug = require('debug')('node-mqtt:index');
const serverPort = process.env.PORT || 3000;
const http = require('http');
const app = require('./server/express.js');
app.set('port', serverPort);
const httpServer = http.createServer(app);
const mosca = require('./server/mosca.js')(httpServer);

httpServer.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(serverPort + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(serverPort + ' is already in use');
            process.exit(1);
            break;
        default:
            console.error(error);
            throw error;
    }
});

httpServer.on('listening', () => {
    debug('http+app server is listening on port '+serverPort);
});

httpServer.listen(serverPort);