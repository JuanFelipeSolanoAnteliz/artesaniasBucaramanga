const express = require('express');
const passport = require('passport');
const { upload } = require('../middleware/cloudinaryConfig');
const UserController = require('../controller/userController');

const router = express.Router();

router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUser/:id', UserController.getUserById);
router.post('/newUser', UserController.createUser);
router.put('/updateUser/:id', UserController.updateUser);
router.post('/loginAndAuth', UserController.loginAndAuth);
router.post('/createAndAuth', UserController.createAndAuth);

router.put('/profile-image/:userId', 
    upload.single('fotoPerfil'), 
    UserController.uploadProfileImage
);

router.get('/auth/discord', passport.authenticate('discord'));
router.get('/auth/discord/callback', 
    passport.authenticate('discord', { failureRedirect: '/login' }), 
    UserController.loginWithDiscord
);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }), 
    UserController.loginWithGoogle
);

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/dashboard');
});

module.exports = router;