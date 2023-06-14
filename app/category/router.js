var express = require('express');
var router = express.Router();

const {list, create, get, edit, deleteItem} = require('./controller');
const {isLoginAdmin, isLoginUser} = require('../middleware/auth');

/* GET home page. */
router.get('/list', list);
router.post('/create', isLoginUser, create);
router.get('/get/:id', get);
router.put('/edit/:id', isLoginUser, edit);
router.delete('/delete/:id', isLoginUser, deleteItem);

module.exports = router;
