const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuariosSchema = new Schema({

    nombreCompleto: {
        nombre: { type: String, trim: true },
        apellidoPaterno: { type: String, trim: true },
        apellidoMaterno: { type: String, trim: true, default: '' }
    },
    fechaNacimiento: Date,
    correo: { type: String, trim: true },
    pasaporte: { type: String, trim: true }

});

mongoose.model('usuarios', usuariosSchema);