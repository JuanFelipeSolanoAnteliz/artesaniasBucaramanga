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

    static async createUser(req, res) {
        try {

            const { nombre, correo, contraseña, fotoPerfil, direccion, telefono, tipo } = req.body;

            const newUser = new Users({
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

            const result = await newUser.save();
            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating user' });
        }
    }


    static async updateUser(req, res) {
        try {
            const { id } = req.params; // Get the user ID from the URL parameters
            const updates = req.body; // Get the data to update from the request body

            // Check if the email is being updated
            if (updates.correo) {
                const existingUser = await Users.findOne({ correo: updates.correo });
                if (existingUser && existingUser._id.toString() !== id) {
                    return res.status(400).json({ message: 'Email is already in use by another user' });
                }
            }

            // Update the user in the database
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

}

module.exports = UserController;
