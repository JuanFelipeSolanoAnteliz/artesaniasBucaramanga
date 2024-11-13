const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    fotoPerfil: { type: String },
    direccion: { type: String },
    telefono: { type: String },
    sexo: { type: String, enum: ['femenino', 'masculino', 'otro'], required: true },
    fechaNacimiento: { type: Date, required: true }, 
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productos' }],
    compras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pedidos' }],
    talleresInscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'talleres' }],
    cupones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cupones' }],
    tipo: { type: String, enum: ['comprador', 'vendedor'], required: true },
    carrito: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productos' }]
}, { versionKey: false }); 

module.exports = mongoose.model('usuarios', userSchema);