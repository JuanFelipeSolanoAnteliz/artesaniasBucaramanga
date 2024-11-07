const express = require('express');
const passport = require('passport');
const UserController = require('../controller/userController');

const router = express.Router();

router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUser/:id', UserController.getUserById);
router.post('/newUser', UserController.createUser);
router.put('/updateUser/:id', UserController.updateUser);
router.post('/loginAndAuth', UserController.loginAndAuth);
router.post('/createAndAuth', UserController.createAndAuth);


// Ruta para iniciar sesión con Discord
router.get('/auth/discord', passport.authenticate('discord'));

// Ruta de callback de Discord
router.get('/auth/discord/callback', 
    passport.authenticate('discord', { failureRedirect: '/' }), 
    UserController.loginWithDiscord // Aquí llamamos al nuevo método
);


module.exports = router;