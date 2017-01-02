const debug = require('debug')('node-mqtt:app');
const express = require('express');
const app = express();

// setting pug a view engine
app.set('view engine', 'pug')

// attach routes
app.use('/',
    require('../api/api.js')
);

app.use('/api',
    require('../api/apiStats.js')
);

// serve static file from public folder
app.use(express.static(process.cwd() + '/public'));

module.exports = app;
