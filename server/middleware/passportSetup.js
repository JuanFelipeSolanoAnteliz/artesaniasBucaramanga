const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy; // Importa la estrategia de GitHub
const Usuario = require('../model/userModel');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')

dotenv.config();

// Estrategia de Discord
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    // console.log(profile)
    try {
        let existingUser  = await Usuario.findOne({ correo: profile.email });
        if (existingUser ) {
            return done(null, existingUser );
        }

        const existingUserName = await Usuario.findOne({ userName: profile.userName });
        if (existingUserName) {
            return done(null, existingUserName);
        }

        const newUser  = new Usuario({
            userName: profile.username || "",
            nombre: profile.userName || "Usuario Sin Nombre",
            correo: profile.email || `${profile.userName}@discord.com`,
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
            avatar: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : "",
            carrito:[]
        });
        
        try {
            console.log('hola estoy guardando');
            await newUser.save();
            console.log("Nuevo usuario guardado correctamente"); // Para confirmar que se guarda
            done(null, newUser);
        } catch (error) {
            console.error("Error al guardar el nuevo usuario: ", error); // Log del error
            done(error, null);
        }
    } catch (error) {
        console.log(error)
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
        console.log(profile)
        let existingUser  = await Usuario.findOne({ correo: profile.emails[0].value });
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

        await newUser.save();
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
