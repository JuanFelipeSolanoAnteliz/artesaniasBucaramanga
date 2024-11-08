const router = require('express').Router();
const controller = require('../controller/voucherController');
const version = require('../middleware/versionate')

router.post('/', version('1.0.0'), controller.addVoucher);

module.exports = router;