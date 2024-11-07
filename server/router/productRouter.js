const router = require('express').Router();
const controller = require('../controller/productsController');
const version = require('../middleware/versionate')

router.get('/', version('1.0.0'), controller.getAllProducts);
router.get('/search', version('1.0.0'), controller.searchProduct);
router.post('/', version('1.0.0'), controller.addProduct);

module.exports = router;