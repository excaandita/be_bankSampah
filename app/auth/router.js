var express = require('express');
var router = express.Router();

const {login, logout} = require('./controller');

/* GET home page. */
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
