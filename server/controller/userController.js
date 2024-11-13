const Users = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { uploadToCloudinary } = require('../middleware/cloudinaryConfig');

require('dotenv').config();

class UserController {


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




    static async updateUser (req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;
    
            // Verifica si se está actualizando el correo
            if (updates.correo) {
                const existingUser  = await Users.findOne({ correo: updates.correo });
                if (existingUser  && existingUser ._id.toString() !== id) {
                    return res.status(400).json({ message: 'Email is already in use by another user' });
                }
            }
    
            // Verifica si se está actualizando el nombre de usuario
            if (updates.userName) {
                const existingUserName = await Users.findOne({ userName: updates.userName });
                if (existingUserName && existingUserName._id.toString() !== id) {
                    return res.status(400).json({ message: 'Username is already in use by another user' });
                }
            }
    
            // Eliminar el campo 'tipo' si existe en la actualización
            delete updates.tipo;
    
            // Actualiza el usuario en la base de datos
            const result = await Users.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    
            // Verifica si el usuario fue encontrado
            if (!result) {
                return res.status(404).json({ message: 'User  not found' });
            }
    
            // Responde con el usuario actualizado
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

            // Generar correo aleatorio si no se proporciona uno
            const emailToUse = correo && correo.trim() !== "" ? correo : await UserController.generateRandomEmail();

            // Validar el nombre de usuario
            const existingUserName = await Users.findOne({ userName });
            if (existingUserName) {
                return res.status(400).json({ message: 'El nombre de usuario ya está en uso, elige otro.' });
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(contraseña, 10);

            // Crear el nuevo usuario
            const newUser   = new Users({
                userName,
                nombre,
                correo: emailToUse, // Usar el correo elegido
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

            // Guardar el nuevo usuario
            await newUser .save();

            // Esperar 1 segundo (1000 ms)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Construir el payload del token
            const tokenPayload = {};
            if (emailToUse) {
                tokenPayload.correo = emailToUse;
            } else if (telefono) {
                tokenPayload.telefono = telefono;
            }

            // Generar el token
            const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1h' });

            // Configurar la cookie
            res.cookie('login', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            });

            return res.status(201).json({ message: 'Usuario creado y autenticado con éxito', jwt: token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear y autenticar al usuario' });
        }
    }

    // Función para generar un correo electrónico aleatorio
    static async generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 15); // Genera una secuencia aleatoria de letras y números
        return `${randomString}@random.com`; // Puedes cambiar "random.com" por cualquier otro nombre ficticio
    }


    static async loginWithDiscord(req, res) {
        try {
            const { id, username, avatar, email } = req.user;

            if (!username) {
                console.error("Username is undefined", req.user);
                return res.status(400).json({ message: "Username is required" });
            }

            let usuario = await Usuario.findOne({ discordId: id });

            if (!usuario) {
                if (!email || !username) {
                    return res.status(400).json({ message: "Email and username are required to create a new user." });
                }

                const existingUser = await Usuario.findOne({ userName: username });
                if (existingUser) {
                    console.log("Username already exists, using existing user.");
                    usuario = existingUser; // Usar el usuario existente
                } else {
                    usuario = new Usuario({
                        userName: username,
                        nombre: "",
                        correo: email || `${username}@discord.com`,
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

            // Configurar la cookie de sesión
            res.cookie('login', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Solo en producción
                maxAge: 3600000 // 1 hora
            });

            // Responder con el token y el usuario
            return res.status(200).json({ token, user: usuario });
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


    static async uploadProfileImage(req, res) {
        try {
            const { userId } = req.params;
    
            if (!req.file) {
                return res.status(400).json({ 
                    message: 'No se ha subido ninguna imagen' 
                });
            }
    
            console.log('Archivo recibido:', req.file); // Debug log
    
            // Subir a Cloudinary
            const imageUrl = await uploadToCloudinary(req.file.path, userId);
    
            // Actualizar usuario
            const updatedUser = await Users.findByIdAndUpdate(
                userId, 
                { fotoPerfil: imageUrl }, 
                { new: true }
            );
    
            if (!updatedUser) {
                return res.status(404).json({ 
                    message: 'Usuario no encontrado' 
                });
            }
    
            res.status(200).json({
                message: 'Imagen de perfil actualizada',
                imageUrl: imageUrl
            });
    
        } catch (error) {
            console.error('Error completo al actualizar imagen:', error);
            res.status(500).json({ 
                message: 'Error al procesar la imagen',
                error: error.message 
            });
        }
    }

}

module.exports = UserController;