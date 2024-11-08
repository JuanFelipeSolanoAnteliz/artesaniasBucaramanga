const connectDB = require('../helper/connect');
const Users = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport'); 
const DiscordUser  = require('../model/discordModel');

require('dotenv').config();

connectDB();

module.exports = class UserController {

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await Users.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User  not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving user' });
        }
    }




    static async createUser(req, res) {
        try {
            const { userName, nombre, correo, contraseña, fotoPerfil, direccion, telefono, sexo, fechaNacimiento } = req.body;
            const newUser = new Users({
                userName,
                nombre,
                correo,
                contraseña,
                fotoPerfil,
                direccion,
                telefono,
                sexo,
                fechaNacimiento,
                tipo: 'comprador',
                favoritos: [],
                compras: [],
                talleresInscritos: [],
                cupones: [],
            });

            const result = await newUser.save();
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating user' });
        }
    }




    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            if (updates.correo) {
                const existingUser = await Users.findOne({ correo: updates.correo });
                if (existingUser && existingUser._id.toString() !== id) {
                    return res.status(400).json({ message: 'Email is already in use by another user' });
                }
            }

            if (updates.userName) {
                const existingUserName = await Users.findOne({ userName: updates.userName });
                if (existingUserName && existingUserName._id.toString() !== id) {
                    return res.status(400).json({ message: 'Username is already in use by another user' });
                }
            }

            delete updates.tipo;

            const result = await Users.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

            if (!result) {
                return res.status(404).json({ message: 'User  not found' });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating user' });
        }
    }


    static async loginAndAuth(req, res) {
        try {
            const { userName, correo, telefono, contraseña } = req.body;

            // Verificar que al menos uno de los campos de identificación esté presente
            if (!userName && !correo && !telefono) {
                return res.status(400).json({ message: 'Please provide userName, correo, or telefono' });
            }

            // Buscar al usuario por userName, correo o telefono
            let user;
            if (userName) {
                user = await Users.findOne({ userName });
            } else if (correo) {
                user = await Users.findOne({ correo });
            } else if (telefono) {
                user = await Users.findOne({ telefono });
            }

            // Si no se encuentra el usuario
            if (!user) {
                return res.status(404).json({ message: 'User  not found' });
            }

            // Verificar la contraseña
            const isMatch = await bcrypt.compare(contraseña, user.contraseña);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Crear el token JWT
            const token = jwt.sign({ id: user._id, correo: user.correo }, process.env.SECRET_KEY, { expiresIn: '1h' });

            // Configurar la cookie de sesión
            res.cookie('login', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            });

            return res.status(200).json({ message: 'Successfully logged in', jwt: token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error logging in' });
        }
    }



    static async createAndAuth(req, res) {
        try {
            const { userName, nombre, correo, contraseña, fotoPerfil, direccion, telefono, sexo, fechaNacimiento } = req.body;

            const existingUser = await Users.findOne({ correo });
            if (existingUser) {
                return res.status(400).json({ message: 'User  already exists, change the email' });
            }

            const existingUserName = await Users.findOne({ userName });
            if (existingUserName) {
                return res.status(400).json({ message: 'Username already exists, choose another one' });
            }

            const hashedPassword = await bcrypt.hash(contraseña, 10);

            const newUser = new Users({
                userName,
                nombre,
                correo,
                contraseña: hashedPassword,
                fotoPerfil,
                direccion,
                telefono,
                sexo,
                fechaNacimiento,
                tipo: 'comprador',
                favoritos: [],
                compras: [],
                talleresInscritos: [],
                cupones: [],
            });

            const result = await newUser.save();
            await new Promise(resolve => setTimeout(resolve, 1000));

            const token = jwt.sign({ id: result._id, correo: result.correo }, process.env.SECRET_KEY, { expiresIn: '1h' });

            res.cookie('login', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            });

            return res.status(201).json({ message: 'Successfully created and authenticated', jwt: token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating and authenticating user' });
        }
    }



    static async loginWithDiscord(req, res) {
        try {
            // Aquí puedes acceder a la información del usuario de Discord desde req.user
            const { id, username, avatar } = req.user; // Asegúrate de que estos campos estén disponibles

            // Verificar si el usuario ya existe en la base de datos
            let discordUser  = await DiscordUser .findOne({ discordId: id });

            if (!discordUser ) {
                // Si no existe, crear un nuevo usuario
                discordUser  = new DiscordUser ({
                    userName: username, // O cualquier otro campo que desees usar
                    nombre: username, // Puedes cambiar esto según lo que necesites
                    correo: `${username}@discord.com`, // Genera un correo temporal o pide uno al usuario
                    contraseña: '', // No necesitas contraseña para usuarios de Discord
                    fotoPerfil: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`, // URL del avatar de Discord
                    direccion: '', // Puedes dejarlo vacío o pedirlo al usuario
                    telefono: '', // Puedes dejarlo vacío o pedirlo al usuario
                    sexo: 'otro', // Puedes dejarlo vacío o pedirlo al usuario
                    fechaNacimiento: new Date(), // Puedes dejarlo vacío o pedirlo al usuario
                    tipo: 'comprador',
                    favoritos: [],
                    compras: [],
                    talleresInscritos: [],
                    cupones: [],
                    discordId: id,
                    avatar: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
                });

                // Guardar el nuevo usuario en MongoDB
                await discordUser .save();
            }

            // Crear el token JWT
            const token = jwt.sign({ id: discordUser ._id, correo: discordUser .correo }, process.env.SECRET_KEY, { expiresIn: '1h' });

            // Configurar la cookie de sesión
            res.cookie('login', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            });

            return res.status(200).json({ message: 'Successfully logged in with Discord', jwt: token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error logging in with Discord' });
        }
    }



}   


