const router = require('express').Router();
const controller = require('../controller/workshopsController');
const version = require('../middleware/versionate')

router.get('/', version('1.0.0'), controller.search);

module.exports = router;