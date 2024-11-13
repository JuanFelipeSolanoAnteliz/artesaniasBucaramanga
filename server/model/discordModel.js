const mongoose = require('mongoose');

const discordUserSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true }, // Nombre de usuario
    nombre: { type: String, required: true }, // Nombre real
    correo: { type: String, required: true, unique: true }, // Correo electrónico
    contraseña: { type: String, required: true }, // Contraseña (puedes usarla si es necesario)
    fotoPerfil: { type: String }, // URL de la foto de perfil
    direccion: { type: String }, // Dirección
    telefono: { type: String }, // Teléfono
    sexo: { type: String, enum: ['femenino', 'masculino', 'otro'], required: true }, // Sexo
    fechaNacimiento: { type: Date, required: true }, // Fecha de nacimiento
    tipo: { type: String, enum: ['comprador', 'vendedor'], required: true }, // Tipo de usuario
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productos' }], // Productos favoritos
    compras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pedidos' }], // Compras realizadas
    talleresInscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'talleres' }], // Talleres inscritos
    cupones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cupones' }], // Cupones asociados
    discordId: { type: String, required: true, unique: true }, // ID de Discord
    avatar: { type: String }, // URL del avatar de Discord
}, { versionKey: false });

module.exports = mongoose.model('DiscordUser ', discordUserSchema);