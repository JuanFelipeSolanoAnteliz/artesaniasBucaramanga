const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy; // Importa la estrategia de GitHub
const Usuario = require('../model/userModel');
const dotenv = require('dotenv');

dotenv.config();

// Estrategia de Discord
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let existingUser  = await Usuario.findOne({ discordId: profile.id });

        if (existingUser ) {
            return done(null, existingUser );
        }

        const existingUserName = await Usuario.findOne({ userName: profile.username });
        if (existingUserName) {
            return done(null, existingUserName);
        }

        const newUser  = new Usuario({
            userName: profile.username || "",
            nombre: profile.username || "Usuario Sin Nombre",
            correo: profile.email || `${profile.username}@discord.com`,
            contraseña: "",
            fotoPerfil: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : "",
            direccion: "",
            telefono: "",
            sexo: "otro",
            fechaNacimiento: null,
            tipo: "comprador",
            favoritos: [],
            compras: [],
            talleresInscritos: [],
            cupones: [],
            discordId: profile.id || "",
            avatar: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : ""
        });

        await newUser .save();
        done(null, newUser );
    } catch (error) {
        done(error, null);
    }
}));

// Estrategia de Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let existingUser  = await Usuario.findOne({ googleId: profile.id });

        if (existingUser ) {
            return done(null, existingUser );
        }

        const existingUserName = await Usuario.findOne({ userName: profile.displayName });
        if (existingUserName) {
            return done(null, existingUserName);
        }

        const newUser  = new Usuario({
            userName: profile.displayName || "",
            nombre: profile.displayName || "Usuario Sin Nombre",
            correo: profile.emails[0].value || `${profile.displayName}@google.com`,
            contraseña: "",
            fotoPerfil: profile.photos[0].value || "",
            direccion: "",
            telefono: "",
            sexo: "otro",
            fechaNacimiento: null,
            tipo: "comprador",
            favoritos: [],
            compras: [],
            talleresInscritos: [],
            cupones: [],
            googleId: profile.id || "",
            avatar: profile.photos[0].value || ""
        });

        await newUser .save();
        done(null, newUser );
    } catch (error) {
        done(error, null);
    }
}));

// Estrategia de GitHub
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let existingUser  = await Usuario.findOne({ githubId: profile.id });

        if (existingUser ) {
            return done(null, existingUser );
        }

        const existingUserName = await Usuario.findOne({ userName: profile.username || profile.displayName });
        if (existingUserName) {
            return done(null, existingUserName);
        }

        const newUser  = new Usuario({
            userName: profile.username || profile.displayName || "",
            nombre: profile.displayName || "Usuario Sin Nombre",
            correo: (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : `${profile.username}@github.com`,
            contraseña: "",
            fotoPerfil: (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : "",
            direccion: "",
            telefono: "",
            sexo: "otro",
            fechaNacimiento: null,
            tipo: "comprador",
            favoritos: [],
            compras: [],
            talleresInscritos: [],
            cupones: [],
            githubId: profile.id || "",
            avatar: (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : ""
        });

        await newUser .save();
        done(null, newUser );
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser ((user, done) => {
    done(null, user.id);
});

passport.deserializeUser (async (id, done) => {
    try {
        const user = await Usuario.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
