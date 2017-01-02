//Require the dev-dependencies
const supertest = require('supertest');
const should = require('should');
const mqtt = require('mqtt');

const port = process.env.PORT || 3000;
const mqttPort = process.env.MQTT_PORT || 1883;
const url = 'http://localhost:' + port + '/api';
const mqttUrl = 'mqtt://localhost:' + mqttPort;
const request = supertest.agent(url);

describe('TEST API STATS on ' + url, () => {
    let token = null;

    // runs once before all tests
    before((done) => {
        // put logic here
        token = 'lallero';
        done();
    });

    describe('GET /clientStats', () => {
        let client1 = null;
        it('reading connected clients (should be 0)', (done) => {
            request
                .get('/clientStats')
                .set('Authorization', token)
                .set('Accept', 'application/json; charset=utf-8')
                .send()
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        res.body.should.not.have.property('error');
                        res.body.should.have.property('clients', 0);
                        done();
                    }
                });
        });

        it('connecting a client', (done) => {
            client1 = mqtt.connect(mqttUrl);
            client1.on('connect', () => {
                done();
            });
            client1.on('error', (error) => {
                done(error);
            });
        });

        it('reading connected clients (should be 1)', (done) => {
            request
                .get('/clientStats')
                .set('Authorization', token)
                .set('Accept', 'application/json; charset=utf-8')
                .send()
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        res.body.should.not.have.property('error');
                        res.body.should.have.property('clients', 1);
                        done();
                    }
                });
        });

        it('diconnecting a client', (done) => {
            client1.end(done);
        });

        it('reading connected clients (should be 0 again)', (done) => {
            request
                .get('/clientStats')
                .set('Authorization', token)
                .set('Accept', 'application/json; charset=utf-8')
                .send()
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        res.body.should.not.have.property('error');
                        res.body.should.have.property('clients', 0);
                        done();
                    }
                });
        });
    });

    describe('GET /topicStats', () => {
        let client2 = null;
        it('reading topicStats (should be empty)', (done) => {
            request
                .get('/topicStats')
                .set('Authorization', token)
                .set('Accept', 'application/json; charset=utf-8')
                .send()
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        res.body.should.not.have.property('error');
                        res.body.should.be.empty();
                        done();
                    }
                });
        });

        it('connecting a client', (done) => {
            client2 = mqtt.connect(mqttUrl);
            client2.on('connect', () => {
                done();
            });
            client2.on('error', (error) => {
                done(error);
            });
        });

        it('subscribing to multiple topics', (done) => {
            client2.subscribe([
                'rooms/12345/#',
                'rooms/67890/#',
                'rooms/24680/#',
                'rooms/13579/#',
            ], 0, done);
        });

        it('reading topicStats again (should contain at least 4 topics)', (done) => {
            request
                .get('/topicStats')
                .set('Authorization', token)
                .set('Accept', 'application/json; charset=utf-8')
                .send()
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        done(err);
                    } else {
                        res.body.should.not.have.property('error');
                        res.body.should.be.not.empty();
                        res.body.should.be.eql({
                            'rooms/12345/#': 1,
                            'rooms/67890/#': 1,
                            'rooms/24680/#': 1,
                            'rooms/13579/#': 1,
                        });
                        done();
                    }
                });
        });

        it('diconnecting a client', (done) => {
            client2.end(done);
        });
    });
});