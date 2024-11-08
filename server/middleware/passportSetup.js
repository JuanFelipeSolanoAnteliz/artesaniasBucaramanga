const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const Usuario = require('../model/userModel'); // Importar el modelo de usuario
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Configurar la estrategia de Discord
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'email'] // Asegúrate de que 'identify' esté presente
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile); // Para depuración: ver el perfil recibido

    try {
        // Verificar si el usuario ya existe en la base de datos
        let existingUser  = await Usuario.findOne({ discordId: profile.id });

        if (existingUser ) {
            return done(null, existingUser );
        }

        // Si no existe, verificar si el userName ya está en uso
        const existingUserName = await Usuario.findOne({ userName: profile.username });
        if (existingUserName) {
            console.log("Username already exists, using existing user.");
            return done(null, existingUserName); // Usar el usuario existente
        }

        // Si no existe, crea un nuevo usuario
        const newUser  = new Usuario({
            userName: profile.username || "", // Usar el nombre de usuario de Discord
            nombre: profile.username || "Usuario Sin Nombre", // Usar el nombre de usuario como nombre
            correo: profile.email || `${profile.username}@discord.com`, // Correo temporal si no hay
            contraseña: "", // No se requiere contraseña si se usa Discord
            fotoPerfil: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : "",
            direccion: "", // Cadena vacía por defecto
            telefono: "", // Cadena vacía por defecto
            sexo: "otro", // Valor predeterminado
            fechaNacimiento: null, // Cambiar a null para evitar validación
            tipo: "comprador", // Valor predeterminado
            favoritos: [],
            compras: [],
            talleresInscritos: [],
            cupones: [],
            discordId: profile.id || "", // Agregar el ID de Discord
            avatar: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : "" // URL del avatar
        });

        // Guardar el nuevo usuario en MongoDB
        await newUser .save();
        done(null, newUser );
    } catch (error) {
        console.error("Error durante la creación del usuario:", error);
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
        const user = await Usuario.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport; // Asegúrate de exportar passport si lo necesitas en otro lugar