var express = require('express');
var router = express.Router();

const {isLoginAdmin, isLoginUser, isLogin} = require('../middleware/auth');
const {list, create, get, edit, deleteItem} = require('./controller');
// 
/* GET home page. */
router.get('/list', isLogin, list);
router.post('/create', isLogin, isLoginAdmin, create);
router.get('/get/:id', get);
router.put('/edit/:id', isLogin, isLoginAdmin, edit);
router.delete('/delete/:id', isLogin, isLoginAdmin, deleteItem);

module.exports = router;
