var express = require('express');
var router = express.Router();

const {list, create, get, edit} = require('./controller');
// const {isLoginAdmin, isLoginUser, isLogin} = require('../middleware/auth');

/* GET home page. */
router.get('/list', list);
router.post('/create', create);
router.get('/get/:id', get);
router.put('/edit/:id', edit);


module.exports = router;
