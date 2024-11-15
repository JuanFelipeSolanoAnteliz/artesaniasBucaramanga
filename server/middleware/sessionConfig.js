const session = require('express-session');


module.exports = session ({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized:true,
    cookie: { 
        httpOnly: true,
        secure: false,  // Cambia a true en producción si usas HTTPS
        maxAge: 3600000,  // 1 hora
        sameSite: 'Lax',  // 'Strict' es la opción más segura
    }
});