const express = require('express');
const UserController = require('../controller/userController');

const router = express.Router();

router.get('/getAllUsers', UserController.getAllUsers);
router.post('/newUser', UserController.createUser );

module.exports = router;