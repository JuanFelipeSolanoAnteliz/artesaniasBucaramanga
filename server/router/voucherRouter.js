const router = require('express').Router();
const controller = require('../controller/voucherController');
const version = require('../middleware/versionate')

router.get('/', version('1.0.0'), controller.getVouchers);
router.post('/', version('1.0.0'), controller.addVoucher);

module.exports = router;