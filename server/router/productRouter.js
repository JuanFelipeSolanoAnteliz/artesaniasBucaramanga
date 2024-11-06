const router = require('express').Router();
const controller = require('../controller/productsController');
const version = require('../middleware/versionate')

router.get('/', version('1.0.0'), controller.getAllProducts);

module.exports = router;