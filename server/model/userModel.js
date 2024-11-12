const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true }, // Obligatorio y único
    nombre: { type: String, required: false }, // No obligatorio
    correo: { type: String, required: false, unique: true }, // Obligatorio y único
    contraseña: { type: String, required: false }, // No obligatorio
    fotoPerfil: { type: String, required: false },
    direccion: { type: String, required: false },
    telefono: { type: String, required: false },
    sexo: { type: String, enum: ['femenino', 'masculino', 'otro'], required: false }, // Obligatorio
    fechaNacimiento: { type: Date, required: false }, // No obligatorio
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productos' }],
    compras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pedidos' }],
    talleresInscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'talleres' }],
    cupones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cupones' }],
    tipo: { type: String, enum: ['comprador', 'vendedor'], required: true }, // Obligatorio
}, { versionKey: false }); 

module.exports = mongoose.model('usuarios', userSchema);