const router = require('express').Router();
const controller = require('../controller/productsController');
const version = require('../middleware/versionate')
const {auth} = require('../middleware/JWTdecoded');

// router.use(auth);


router.get('/', version('1.0.0'), controller.getAllProducts);
router.get('/discounts', version('1.0.0'), controller.getDiscounts);
router.get('/search', version('1.0.0'), controller.searchProduct);
router.get('/:category', version('1.0.0'), controller.getByCategory);
router.post('/', version('1.0.0'), controller.addProduct);


module.exports = router;