const router = require('express').Router();
const controller = require('../controller/userController');
const version = require('../middleware/versionate')

router.get('/', version('1.0.0'),controller.getAllUsers);

module.exports = router;