const debug = require('debug')('node-mqtt:mosca:events');

module.exports.onClientConnected = (client) => {
    debug('client connected: ' + client.id);
};
module.exports.onClientDisconnecting = (client) => {
    debug('client disconnecting: ' + client.id);
};
module.exports.onClientDisconnected = (client) => {
    debug('client disconnected: ' + client.id);
};
module.exports.onSubscribed = (topic, client) => {
    debug(client.id + ' subscribed on ' + topic);
};
module.exports.onUnsubscribed = (topic, client) => {
    debug(client.id + ' unsubscribed from ' + topic);
};
module.exports.onDelivered = (packet, client) => {
    debug('delivered to ' + client.id + ' on ' + packet.topic + ': ' + packet.payload);
};
module.exports.onPublished = (packet, client) => {
    debug('new message by ' + client.id + ' on ' + packet.topic + ': ' + packet.payload);
};