const mongoose = require('mongoose');
const {Schema}= mongoose;
const MENSAJE_ERROR = 'Falta elemento {PATH}.';

const vueloSchema = new Schema({
  matricula:{
    type: String,
    required: MENSAJE_ERROR,
    trim:true;
  }
});