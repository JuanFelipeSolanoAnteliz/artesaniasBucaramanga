const Users = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

require('dotenv').config();

class UserController{

    static async getAllUsers(req, res) {
        try {
            const result = await Users.find();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving users' });
        }
    }



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
            req.session.auth = token;

            return res.status(202).json({ message: 'User logged in successfully', token });
            
        }catch(error){
            console.log(error);
            return error;
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



    static async loginWithDiscord(req, res) {
        try {
            const { id, userName, avatar, correo } = req.user;
            if (!userName) {
                console.error("Username is undefined", req.user);
                return res.status(400).json({ message: "Username is required" });
            }

            let usuario = await Users.findOne({ correo: correo });
            if (!usuario) {
                if (!correo || !userName) {
                    return res.status(400).json({ message: "Email and username are required to create a new user." });
                }

                const existingUser = await Users.findOne({ username: userName });
                if (existingUser) {
                    console.log("Username already exists, using existing user.");
                    usuario = existingUser; // Usar el usuario existente
                } else {
                    usuario = new Users({
                        userName: userName,
                        nombre: "",
                        correo: email || `${userName}@discord.com`,
                        contraseña: "",
                        fotoPerfil: avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : '',
                        direccion: '',
                        telefono: '',
                        sexo: 'otro',
                        fechaNacimiento: null,
                        favoritos: [],
                        compras: [],
                        talleresInscritos: [],
                        cupones: [],
                        discordId: id,
                        avatar: avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : '',
                        tipo: 'comprador'
                    });

                    await usuario.save();
                }
            }

            // Crear el token JWT
            const token = jwt.sign({ id: usuario._id, correo: usuario.correo }, process.env.SECRET_KEY, { expiresIn: '1h' });
            req.session.auth = token;
            return res.status(200).json({ status:200, message:'users logged in successfully'})
        } catch (error) {
            console.error("Error al iniciar sesión con Discord:", error);
            return res.status(500).json({ message: 'Error al iniciar sesión con Discord' });
        }
    }



    static async loginWithGoogle(req, res) {
        try {
            const { id, displayName, email, photos } = req.user;
    
            if (!displayName) {
                console.error("Display name is undefined", req.user);
                return res.status(400).json({ message: "Display name is required" });
            }
    
            let usuario = await Usuario.findOne({ googleId: id });
    
            if (!usuario) {
                if (!email || !displayName) {
                    return res.status(400).json({ message: "Email and display name are required to create a new user." });
                }
    
                const existingUser  = await Usuario.findOne({ userName: displayName });
                if (existingUser ) {
                    console.log("Username already exists, using existing user.");
                    usuario = existingUser ; // Usar el usuario existente
                } else {
                    usuario = new Usuario({
                        userName: displayName,
                        nombre: "",
                        correo: email || `${displayName}@google.com`,
                        contraseña: "",
                        fotoPerfil: photos && photos.length > 0 ? photos[0].value : '',
                        direccion: '',
                        telefono: '',
                        sexo: 'otro',
                        fechaNacimiento: null,
                        favoritos: [],
                        compras: [],
                        talleresInscritos: [],
                        cupones: [],
                        googleId: id,
                        tipo: 'comprador'
                    });
    
                    await usuario.save();
                }
            }
    
            const token = jwt.sign({ id: usuario._id, correo: usuario.correo }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
            res.cookie('login', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hora
            });
    
            return res.status(200).json({ token, user: usuario });
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
            return res.status(500).json({ message: 'Error al iniciar sesión con Google' });
        }
    }



    static async loginWithGitHub(req, res) {
        try {
            const { id, displayName, email, photos } = req.user;

            if (!displayName) {
                console.error("Display name is undefined", req.user);
                return res.status(400).json({ message: "Display name is required" });
            }

            let usuario = await Usuario.findOne({ githubId: id });

            if (!usuario) {
                if (!email || !displayName) {
                    return res.status(400).json({ message: "Email and display name are required to create a new user." });
                }

                const existingUser  = await Usuario.findOne({ userName: displayName });
                if (existingUser ) {
                    console.log("Username already exists, using existing user.");
                    usuario = existingUser ; // Usar el usuario existente
                } else {
                    usuario = new Usuario({
                        userName: displayName,
                        nombre: "",
                        correo: email || `${displayName}@github.com`,
                        contraseña: "",
                        fotoPerfil: photos && photos.length > 0 ? photos[0].value : '',
                        direccion: '',
                        telefono: '',
                        sexo: 'otro',
                        fechaNacimiento: null,
                        favoritos: [],
                        compras: [],
                        talleresInscritos: [],
                        cupones: [],
                        githubId: id,
                        tipo: 'comprador'
                    });

                    await usuario.save();
                }
            }

            const token = jwt.sign({ id: usuario._id, correo: usuario.correo }, process.env.SECRET_KEY, { expiresIn: '1h' });

            res.cookie('login', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hora
            });

            return res.status(200).json({ token, user: usuario });
        } catch (error) {
            console.error("Error al iniciar sesión con GitHub:", error);
            return res.status(500).json({ message: 'Error al iniciar sesión con GitHub' });
        }
    }


}

module.exports = UserController;
