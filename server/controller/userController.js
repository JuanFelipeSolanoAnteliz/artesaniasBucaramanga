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




}

module.exports = UserController;