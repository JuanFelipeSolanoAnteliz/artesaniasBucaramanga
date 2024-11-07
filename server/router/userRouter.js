const express = require('express');
const passport = require('passport');
const UserController = require('../controller/userController');

router.get('/', version('1.0.0'), controller.getAllUsers);


// Ruta para iniciar sesión con Discord
router.get('/auth/discord', passport.authenticate('discord'));

// Ruta de callback de Discord
router.get('/auth/discord/callback', 
    passport.authenticate('discord', { failureRedirect: '/' }), 
    UserController.loginWithDiscord // Aquí llamamos al nuevo método
);


module.exports = router;