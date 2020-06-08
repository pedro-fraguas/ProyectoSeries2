var express = require('express');
var router = express.Router();
var controller = require('../controllers/usersController');

router.get('/', controller.index);
router.get('/profile', controller.id);
router.get('/register', controller.register);
router.post('/register', controller.submit);
router.get('/login', controller.log);
router.post('/login', controller.login);
router.get('/logout', controller.out);
router.post('/logout', controller.logout);
router.get('/edit-review/:id', controller.editReview);
router.post('/edit-review/:id', controller.updateReview);

module.exports = router;
