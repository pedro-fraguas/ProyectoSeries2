var express = require('express');
var router = express.Router();
var controller = require('../controllers/usersController');

router.get('/', controller.index);
router.get('/:id', controller.id);

module.exports = router;
