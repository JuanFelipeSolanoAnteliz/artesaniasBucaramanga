const router = require('express').Router();
const controller = require('../controller/voucherController');
const version = require('../middleware/versionate')
const {auth} = require('../middleware/JWTdecoded');
router.use(auth);

router.get('/', version('1.0.0'), controller.getVouchers);
router.post('/', version('1.0.0'), controller.addVoucher);

module.exports = router;