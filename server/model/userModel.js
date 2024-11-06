
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true }, // Hashed password
    fotoPerfil: { type: String }, // URL of the profile photo
    direccion: { type: String },
    telefono: { type: String },
    tipo: { type: String, enum: ['comprador', 'vendedor'], required: true },
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productos' }],
    compras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pedidos' }],
    talleresInscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'talleres' }],
    cupones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cupones' }],
  });

  module.exports = mongoose.model('usuarios', userSchema, 'usuarios');
