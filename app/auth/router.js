var express = require('express');
var router = express.Router();

const {login} = require('./controller');

/* GET home page. */
router.post('/login', login);
// router.post('/create', create);
// router.get('/get/:id', get);
// router.put('/edit/:id', edit);
// router.delete('/delete/:id', deleteItem);

module.exports = router;
