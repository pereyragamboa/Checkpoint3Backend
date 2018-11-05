const mongoose = require('mongoose');
const usuariosMiddleware = require ('../lib/usuariosMiddleware');

const Usuario = mongoose.model('usuarios');

module.exports = (app) => {

	app.get('/', async (req, res) =>{
		res.send("Equipo Chikorita");
	});

  // Get todos los Usuarios
	app.get('/api/usuarios', async (req,res) => {
		const usuarios = await Usuario.find();
		res.send(usuarios);	
	});

	//Enviar nuevo Usuario
	app.post(
		'/api/usuarios',
		usuariosMiddleware.datosCompletos,
		usuariosMiddleware.datosPrimitivos,
		async (req, res) => {
        	console.log("\t=> Preparando usuario...");
					const {nombreCompleto, correo, fechaNacimiento, pasaporte} = req.body;
        try {
					const Pasaporte = await Usuario.find({pasaporte: pasaporte});
					//Validar que no se este repitiendo el Numero de pasaporte
					if (Pasaporte.length != 0) {
						res.send("Numero de Pasaporte Repetido");
					} else {
						const usuario = new Usuario({
							nombreCompleto, correo, fechaNacimiento, pasaporte
						});
						const respuesta = await usuario.save();
						res.send("Usuario Guardado");
					}
        } catch (err) {
          res.send(`Error de ejecución: ${err.message}`);
        }
      }
  );

  //eliminar usuario
	app.delete('/api/usuarios/:id', async (req, res) => {
		const usuarios = await Usuario.deleteOne({ _id: req.params.id });
		res.send(usuarios);
	});

	//Editar usuario
	app.post(
		'/api/usuarios/:id', 
		usuariosMiddleware.datosPrimitivos,
		usuariosMiddleware.datosCompletos,
		async (req,res) => {
      const {nombreCompleto, correo, fechaNacimiento, pasaporte} = req.body;

      const respuesta = await Usuario.findOneAndUpdate(
        { _id: req.params.id },
        { nombreCompleto, pasaporte, fechaNacimiento, correo },
        { new: true }
      ).exec();

      res.send(respuesta);
  	}
  );

	//Get solo un usuario
	app.get('/api/usuarios/:id', async(req, res) =>{
		const usuarios = await Usuario.find({ _id: req.params.id });
		res.send(usuarios);
	});
};

