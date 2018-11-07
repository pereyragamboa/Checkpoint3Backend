const mongoose = require('mongoose');
const { Schema } = mongoose;
const REGEX_CODIGO_AEROPUERTO = '[A-Z]{3}';

const vuelosSchema = new Schema({
  fechaSalida: { type: Date, required: true },
  fechaLlegada: { type: Date, required: true },
  origen: {
    type: String,
    required: true,
    trim: true,
    match: REGEX_CODIGO_AEROPUERTO,
    uppercase: true },
  destino: {
    type: String,
    required: true,
    trim: true,
    match: REGEX_CODIGO_AEROPUERTO,
    uppercase: true },
  manifiesto: [],
  idRuta: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  estado: {
    type: String,
    uppercase: true,
    enum: [
      'A TIEMPO',
      'ABORDANDO',
      'EN CURSO',
      'DEMORADO',
      'CANCELADO'
    ],
    default: 'A TIEMPO'
  }
});

mongoose.model('vuelos', vuelosSchema);