var express = require('express');
var router = express.Router();
var controller = require('../controllers/seriesController');

router.get('/', controller.index);
router.get('/search/:query?', controller.search);
router.get('/advanced', controller.advanced);
router.get('/advanced-search', controller.advancedSearch);
router.get('/detail/:id', controller.detail);
router.get('/by-genre/:id', controller.byGenre);
router.get('/favorites', controller.favorites);
router.post('/detail/:id', controller.comment);

module.exports = router;