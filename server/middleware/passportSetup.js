const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const DiscordUser   = require('../model/discordModel');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Configurar la estrategia de Discord
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID, // Tu Client ID de Discord
    clientSecret: process.env.DISCORD_CLIENT_SECRET, // Tu Client Secret de Discord
    callbackURL: process.env.DISCORD_CALLBACK_URL, // Tu URL de callback
    scope: ['identify', 'email'] // Scopes que deseas solicitar
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Verificar si el usuario ya existe en la base de datos
        let existingUser  = await DiscordUser .findOne({ discordId: profile.id });

        if (existingUser ) {
            // Si el usuario ya existe, simplemente devuelve el usuario
            return done(null, existingUser );
        }

        // Si no existe, crea un nuevo usuario
        const newUser  = new DiscordUser ({
            userName: profile.username, // Nombre de usuario
            nombre: profile.username, // Nombre real (puedes ajustarlo)
            correo: profile.email, // Correo electrónico
            contraseña: '', // Puedes dejarlo vacío si no es necesario
            fotoPerfil: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : '', // URL del avatar
            sexo: 'otro', // Puedes ajustar esto según lo que necesites
            fechaNacimiento: new Date(), // Puedes ajustar esto según lo que necesites
            tipo: 'comprador', // Puedes ajustar esto según lo que necesites
            discordId: profile.id, // ID de Discord
            avatar: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : '' // URL del avatar
        });

        await newUser .save();
        done(null, newUser );
    } catch (error) {
        console.error(error);
        done(error, null);
    }
}));

// Serialización del usuario
passport.serializeUser ((user, done) => {
    done(null, user.id);
});

// Deserialización del usuario
passport.deserializeUser (async (id, done) => {
    try {
        const user = await DiscordUser .findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});