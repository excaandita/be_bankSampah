var express = require('express');
var router = express.Router();

const {create} = require('./controller');

/* GET home page. */
router.post('/create', create);

module.exports = router;
