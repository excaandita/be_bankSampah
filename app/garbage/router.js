var express = require('express');
var router = express.Router();

const {list, create} = require('./controller');

/* GET home page. */
router.get('/list', list);
router.post('/create', create);

module.exports = router;
