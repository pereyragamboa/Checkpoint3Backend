const mongoose = require('mongoose');
const { Schema } = mongoose;
const MENSAJE_ERROR = 'Falta elemento {PATH}.';
const TAMANHO_MATRICULA = 'La matrícula consiste de 2 a 10 caracteres.';

const aerolineasSchema = new Schema({
  nombre: {
    type: String,
    required: MENSAJE_ERROR,
    trim: true,
    maxlength: 55 },
  nacionalidad: {
    type: String,
    required: MENSAJE_ERROR,
    trim: true,
    maxlength: 45 },
  flota: [{
    matricula: {
      type: String,
      required: MENSAJE_ERROR,
      trim: true,
      match: "[A-Z|0-9|-]{2,6}",
      minlength: [2, TAMANHO_MATRICULA],
      maxlength: [10, TAMANHO_MATRICULA] },
    capacidad: {
      type: Number,
      required: MENSAJE_ERROR,
      min: [1, "Un avión debe tener pasajeros."],
      max: [200, 'La capacidad máxima de un avión son 200 pasajeros.']
    }
  }]
});

mongoose.model('aerolineas', aerolineasSchema);