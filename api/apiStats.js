const debug = require('debug')('node-mqtt:routes:apiStats');
const router = require('express').Router();
const stats = require('../classes/stats.js');
const apiMsg = require('./apiMessage.js');

router.get('/stats', (req, res) => {
    debug('GET /stats');
    res.json(apiMsg({
        connected_clients: stats.getConnectedClients(),
        subscribed_topics: stats.getSubscribedTopics(),
    }));
});

router.get('/clientStats', (req, res) => {
    debug('GET /clientStats');
    res.json(apiMsg({
        clients: stats.getConnectedClients()
    }));
});

router.get('/topicStats', (req, res) => {
    debug('GET /topicStats');
    res.json(apiMsg(stats.getSubscribedTopics()));
});

module.exports = router;