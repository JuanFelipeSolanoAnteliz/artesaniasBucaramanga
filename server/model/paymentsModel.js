const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'productos', required: true },
    cantidad: { type: Number, required: true, min: 1 },
}, 
{ 
    _id: false 
});

const orderSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios', required: true },
    productos: [ productSchema ],
    total: { type: Number, required: true, min: 0 },
    fecha: { type: Date, default: Date.now },
    estado: { type: String, enum: ['pendiente', 'pagado', 'enviado', 'cancelado'], default: 'pendiente'}
},
{
    versionKey: false
});

module.exports = mongoose.model('pedidos', orderSchema);