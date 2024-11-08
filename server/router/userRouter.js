const express = require('express');
const passport = require('passport');
const UserController = require('../controller/userController');

const router = express.Router();

router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUser/:id', UserController.getUserById);
router.post('/newUser', UserController.createUser );
router.put('/updateUser/:id', UserController.updateUser );
router.post('/loginAndAuth', UserController.loginAndAuth);
router.post('/createAndAuth', UserController.createAndAuth);

// Ruta para iniciar el proceso de autenticación con Discord
router.get('/auth/discord', passport.authenticate('discord'));

// Ruta de callback de Discord que maneja la autenticación y creación de usuario
router.get('/auth/discord/callback', 
    passport.authenticate('discord', { failureRedirect: '/login' }), 
    UserController.loginWithDiscord // Llama a tu controlador para manejar la lógica
);

// Otras rutas de usuario, como obtener el perfil
router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user); // Devuelve el perfil del usuario autenticado
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

module.exports = router;