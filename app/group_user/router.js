var express = require('express');
var router = express.Router();

const {list, create, get, edit, deleteItem} = require('./controller');

/* GET home page. */
router.get('/list', list);
router.post('/create', create);
router.get('/get/:id', get);
router.put('/edit/:id', edit);
router.delete('/delete/:id', deleteItem);

module.exports = router;
