const router = require('express').Router();
const controller = require('../controller/paymentController');
const version = require('../middleware/versionate');

router.get('/', version('1.0.0'), controller.addOrder);
