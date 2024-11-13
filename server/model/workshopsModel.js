const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workshopSchema = new Schema({
  nombre: {type: String,required: true},
  descripcion: {type: String, required: true},
  modalidad: {type: String,enum: ['presencial', 'virtual'],required: true},
  fechaInicio: {type: Date,required: true},
  fechaFin: {type: Date,required: true},
  duracion: {type: String,required: true},
  materialesProporcionados: {type: [String],required: true},
  materialesRequeridos: { type: [String],required: true },
  documental: {type: String,required: true},
  artesanoId: {type: mongoose.Schema.Types.ObjectId,ref: 'Artesano', required: true},
  ubicacion: {type: String,required: true}
}, {
  versionKey: false
});

const Workshop = mongoose.model('talleres', workshopSchema);

module.exports = Workshop;
