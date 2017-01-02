const debug = require('debug')('node-mqtt:authentication');

module.exports = (req, res, next) => {
    // TODO: add authentication code here!
    debug('authenticated');
    next();
};