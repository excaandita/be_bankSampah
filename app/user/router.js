var express = require('express');
var router = express.Router();

const {isLoginAdmin, isLoginUser} = require('../middleware/auth');
const {list, create, get, edit, deleteItem} = require('./controller');
// 
/* GET home page. */
router.get('/list', isLoginAdmin, list);
router.post('/create', isLoginAdmin, create);
router.get('/get/:id', get);
router.put('/edit/:id', isLoginAdmin, edit);
router.delete('/delete/:id', isLoginAdmin, deleteItem);

module.exports = router;
