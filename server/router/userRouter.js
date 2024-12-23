const express = require('express');
const passport = require('passport');
const UserController = require('../controller/userController');
const jwt = require('jsonwebtoken');
const {auth} = require ("../middleware/JWTdecoded")
const limit = require('../limit/userLimit');

const router = express.Router();

router.get('/getAllUsers', UserController.getAllUsers);
router.post('/newUser', UserController.createAndAuth );
router.post('/loginAndAuth', limit.login ,UserController.loginAndAuth);
router.post('/createAndAuth', UserController.createAndAuth);

router.get('/auth/discord', passport.authenticate('discord'));
router.get('/auth/discord/callback', 
passport.authenticate('discord', { failureRedirect: '/registro' }),
(req, res, next) => {
    const user = req.user; 
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    req.session.auth = token;
    req.session.save((err) => {
        if (err) {
            console.error("Error al guardar la sesión", err);
            return res.status(500).json({ message: 'Error al guardar la sesión' });
        }
        next();
    });
},
(req, res) => {
    return res.redirect('/tallerMes');  
}
);

router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/registro' }),
(req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    req.session.auth = token;
    req.session.save((err) => {
        if (err) {
            console.error("Error al guardar la sesión", err);
            return res.status(500).json({ message: 'Error al guardar la sesión' });
        }
        return res.redirect('/tallerMes');
    });
}
);

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', 
passport.authenticate('github', { failureRedirect: '/registro' }),
(req, res, next) => {
    const user = req.user;
    console.log(user);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    req.session.auth = token;  
    req.session.save((err) => {
        if (err) {
            console.error("Error al guardar la sesión", err);
            return res.status(500).json({ message: 'Error al guardar la sesión' });
        }
        next();
    });
},
(req, res) => {
    console.log('Sesión de usuario:', req.session);  
    return res.redirect('/tallerMes'); 
}
);


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.use(auth)
router.get('/getUser', UserController.getUserById);
router.put('/updateUser', UserController.updateUser );
module.exports = router;