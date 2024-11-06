const mongoose = require('mongoose');
const { Schema } = mongoose;

const couponSchema = new Schema(
    {
        codigo: { type: String, required: true, unique: true },
        descuento: { type: Number, required: true },
        tipo: { type: String, required: true, enum: ['asignado a usuario', 'genereal'] },
        fechaExpiracion: { type: Date, required: true },
        usuarioId: { type: Schema.Types.ObjectId, ref: 'usuarios', required: true }
    }, 
    {  
        timestamps: true 
    }
);


const Coupon = mongoose.model('cupones', couponSchema);
module.exports = Coupon;
