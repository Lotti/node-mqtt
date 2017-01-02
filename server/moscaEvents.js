const debug = require('debug')('ambiensvr-mqtt:mosca:events');
const stats = require('../classes/stats.js');

module.exports.onClientConnected = (client) => {
    debug('client connected: ' + client.id);
    stats.addClient();
};
module.exports.onClientDisconnecting = (client) => {
    debug('client disconnecting: ' + client.id);
};
module.exports.onClientDisconnected = (client) => {
    debug('client disconnected: ' + client.id);
    stats.subClient();
};
module.exports.onSubscribed = (topic, client) => {
    debug(client.id + ' subscribed on ' + topic);
    stats.addTopic(topic);
};
module.exports.onUnsubscribed = (topic, client) => {
    debug(client.id + ' unsubscribed from ' + topic);
    stats.subTopic(topic);
};
module.exports.onDelivered = (packet, client) => {
    debug('delivered to ' + client.id + ' on ' + packet.topic + ': ' + packet.payload);
};
module.exports.onPublished = (packet, client) => {
    debug('new message by ' + client.id + ' on ' + packet.topic + ': ' + packet.payload);
};