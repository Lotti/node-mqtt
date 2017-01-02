const debug = require('debug')('node-mqtt:routes:api');
const router = require('express').Router();
const bodyParser = require('body-parser');
const authentication = require('./authentication.js');
const stats = require('../classes/stats.js');

router.use(authentication);
router.use(bodyParser.json());

router.get('/', function (req, res) {
    res.render('index', {
        title: 'node-mqtt',
        message: 'MQTT Server Status',
        connected_clients: 'connected clients: ' + stats.getConnectedClients(),
        subscribed_topics: 'subscribed topics: ' + JSON.stringify(stats.getSubscribedTopics(), null, 4)
    });
});

module.exports = router;