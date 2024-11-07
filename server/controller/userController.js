const Users = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

    static async createUser (req, res) {
        try {
            const { nombre, correo, contraseña, fotoPerfil, direccion, telefono } = req.body;

            // Siempre establecer el tipo como "comprador"
            const newUser  = new Users({
                nombre,
                correo,
                contraseña,
                fotoPerfil,
                direccion,
                telefono,
                tipo: 'comprador', // Establecer tipo como "comprador"
                favoritos: [],
                compras: [],
                talleresInscritos: [],
                cupones: []
            });

            const result = await newUser .save();
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating user' });
        }
    }

    static async updateUser (req, res) {
        try {
            const { id } = req.params; // Obtener el ID del usuario de los parámetros de la URL
            const updates = req.body; // Obtener los datos a actualizar del cuerpo de la solicitud

            // Verificar si el correo está siendo actualizado
            if (updates.correo) {
                const existingUser  = await Users.findOne({ correo: updates.correo });
                if (existingUser  && existingUser ._id.toString() !== id) {
                    return res.status(400).json({ message: 'Email is already in use by another user' });
                }
            }

            // Eliminar el campo "tipo" de las actualizaciones para que no se pueda modificar
            delete updates.tipo;

            // Actualizar el usuario en la base de datos
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

    static async createAndAuth(req, res) {
        try {
            const { nombre, correo, contraseña, fotoPerfil, direccion, telefono } = req.body;
    
            // Verificar si el usuario ya existe
            const existingUser   = await Users.findOne({ correo });
            if (existingUser ) {
                return res.status(400).json({ message: 'User  already exists, change the email' });
            }
    
            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(contraseña, 10);
    
            // Crear un nuevo usuario
            const newUser   = new Users({
                nombre,
                correo,
                contraseña: hashedPassword,
                fotoPerfil,
                direccion,
                telefono,
                tipo: 'comprador',
                favoritos: [],
                compras: [],
                talleresInscritos: [],
                cupones: []
            });
    
            // Guardar el nuevo usuario en la base de datos
            const result = await newUser .save();
    
            // Introducir un retraso de 1 segundo antes de continuar
            await new Promise(resolve => setTimeout(resolve, 1000));
    
            // Generar un token JWT usando la clave secreta del archivo .env
            const token = jwt.sign({ id: result._id, correo: result.correo }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
            // Establecer la cookie con el token JWT
            res.cookie('login', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hora
            });
    
            // Responder con éxito
            return res.status(201).json({ message: 'Successfully created and authenticated', jwt: token });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating and authenticating user' });
        }
    }




}

module.exports = UserController;