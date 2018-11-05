const mongoose = require('mongoose');
const { Schema } = mongoose;
const MENSAJE_ERROR = 'Falta elemento {PATH}.';

const aerolineasSchema = new Schema({
  nombre: {
    type: String,
    required: MENSAJE_ERROR,
    trim: true },
  nacionalidad: {
    type: String,
    required: MENSAJE_ERROR,
    trim: true },
  flota: [{
    matricula: {
      type: String,
      required: MENSAJE_ERROR,
      trim: true },
    capacidad: {
      type: Number,
      required: MENSAJE_ERROR,
      min: 0,
      max: [200, 'La capacidad máxima de un avión son 200 pasajeros.']
    }
  }]
});

mongoose.model('aerolineas', aerolineasSchema);