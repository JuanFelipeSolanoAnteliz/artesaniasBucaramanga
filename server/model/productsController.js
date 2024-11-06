const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        nombre: {type: String,required: true},
        descripcion: {type: String,required: true},
        precio: {type: Number,required: true},
        categoria: {type: String,required: true},
        fotos: [{type: String}],
        stock: {type: Number,required: true},
        artesanoId: {type: mongoose.Schema.Types.ObjectId, ref: 'usuarios', required: true}
    }, 
    {
        timestamps: false
    }
)

module.exports = mongoose.model('productos', userSchema);