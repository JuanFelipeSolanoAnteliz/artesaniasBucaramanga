const express = require('express');
const passport = require('passport');
const UserController = require('../controller/userController');
const router = express.Router();
const version = require('../middleware/versionate');

router.post('/loginAndAuth', version('1.0.0'), UserController.loginAndAuth);
router.get('/auth/discord', passport.authenticate('discord'));
router.post('/createAndAuth', UserController.createAndAuth);

// Ruta de callback de Discord
router.get('/auth/discord/callback', 
    passport.authenticate('discord', { failureRedirect: '/' }), 
    UserController.loginWithDiscord // Aquí llamamos al nuevo método
);


module.exports = router;