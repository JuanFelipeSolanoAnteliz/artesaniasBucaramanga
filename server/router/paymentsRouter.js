const router = require('express').Router();
const controller = require('../controller/paymentController');
const version = require('../middleware/versionate');
const {auth} = require('../middleware/JWTdecoded');

router.use(auth);

router.post('/', version('1.0.0'), controller.addOrder);
router.put('/addtoCart/:id', version('1.0.0'), controller.addToCart)

module.exports = router;