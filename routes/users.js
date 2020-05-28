var express = require('express');
var router = express.Router();
var controller = require('../controllers/usersController');

router.get('/', controller.index);
router.get('/profile/:id', controller.id);
router.get('/register', controller.register);
router.post('/register', controller.submit);

module.exports = router;
