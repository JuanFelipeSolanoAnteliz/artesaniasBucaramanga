const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    nombre: { type: String, required: false },
    correo: { type: String, required: false, unique: true },
    contraseña: { type: String, required: false },
    fotoPerfil: { type: String, required: false },
    direccion: { type: String, required: false },
    telefono: { type: String, required: false },
    sexo: { type: String, enum: ['femenino', 'masculino', 'otro'], required: false },
    fechaNacimiento: { type: Date, required: false },
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productos' }],
    compras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pedidos' }],
    talleresInscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'talleres' }],
    cupones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cupones' }],
    tipo: { type: String, enum: ['comprador', 'vendedor'], required: true },
    carrito: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productos' }]
}, { versionKey: false }); 

module.exports = mongoose.model('usuarios', userSchema);