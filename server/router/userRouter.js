const express = require('express');
const UserController = require('../controller/userController');

const router = express.Router();

router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUser/:id', UserController.getUserById);
router.post('/newUser', UserController.createUser);
router.put('/updateUser/:id', UserController.updateUser);
router.post('/createAndAuth', UserController.createAndAuth);

module.exports = router;