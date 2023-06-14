var express = require('express');
var router = express.Router();

const {login} = require('./controller');

/* GET home page. */
router.post('/login', login);

module.exports = router;
