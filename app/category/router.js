var express = require('express');
var router = express.Router();

const {list, create, get, edit, deleteItem} = require('./controller');
const {isLoginAdmin, isLoginUser, isLogin} = require('../middleware/auth');

/* GET home page. */
router.get('/list', list);
router.post('/create', isLogin, isLoginUser, create);
router.get('/get/:id', get);
router.put('/edit/:id', isLogin, isLoginUser, edit);
router.delete('/delete/:id', isLogin, isLoginUser, deleteItem);

module.exports = router;
