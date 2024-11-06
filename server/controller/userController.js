const Users = require('../model/userModel');

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

            const { nombre, correo, contraseña, fotoPerfil, direccion, telefono, tipo } = req.body;
    
            const newUser  = new Users({
                nombre,
                correo,
                contraseña,
                fotoPerfil,
                direccion,
                telefono,
                tipo,
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



}

module.exports = UserController;
