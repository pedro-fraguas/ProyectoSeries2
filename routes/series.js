var express = require('express');
var router = express.Router();
var controller = require('../controllers/seriesController');

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/advanced-search', controller.advancedSearch);
router.get('/detail/:id', controller.detail);
router.get('/by-genre/:id', controller.byGenre);

module.exports = router;