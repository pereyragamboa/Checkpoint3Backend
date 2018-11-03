const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuariosSchema = new Schema({

    "nombreCompleto": {
        "nombre": String,
        "apellidoPaterno": String,
        "apellidoMaterno": {type:String, default:''}
    },
    "fechaNacimiento": String,
    "correo": String,
    "pasaporte": String

});

mongoose.model('usuarios', usuariosSchema);