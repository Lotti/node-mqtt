const debug = require('debug')('node-mqtt:routes:api');
const router = require('express').Router();
const bodyParser = require('body-parser');
const authentication = require('./authentication.js');

router.use(authentication);
router.use(bodyParser.json());

module.exports = router;
