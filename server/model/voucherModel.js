const mongoose = require('mongoose');
const { Schema } = mongoose;

const couponSchema = new Schema(
    {
        codigo: { type: String, required: true, unique: true },
        descuento: { type: Number, required: true },
        tipo: { type: String, required: true, enum: ['asignado a usuario', 'general'] },
        fechaExpiracion: { type: Date, required: true },
        usuarioId: { type: Schema.Types.ObjectId, ref: 'usuarios', required: false, default: null, validate: { validator: v => v === null || mongoose.Types.ObjectId.isValid(v), message: props => `${props.value} no es un ObjectId válido!` } }
    }, 
    {  
        versionKey: false 
    }
);


const Coupon = mongoose.model('cupones', couponSchema);
module.exports = Coupon;
