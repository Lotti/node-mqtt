const debug = require('debug')('node-mqtt:app');
const express = require('express');
const app = express();

// serve static file from public folder
app.use(express.static(process.cwd() + '/public'));

// attach routes
app.use('/api',
    require('../api/api.js')
);

module.exports = app;
