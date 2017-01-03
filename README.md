# node-mqtt

The server is composed by a REST API server and an MQTT broker. At this time the MQTT broker is working on WebSocket instead of a dedicated port.

You can also run locally the server by using these commands.

start the server with 
```
npm start
```

run tests suite with
```
npm test
```

Keep in mind that node v6.1.0 was used to develop this software.

## Example apis

```
GET /api/clientStats
```
Returns the number of connected mqtt clients.
```
GET /api/topicStats
```
Returns the number of subscribed topics.