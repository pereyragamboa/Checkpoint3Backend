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
		usuariosMiddleware.datosPrimitivos,
		usuariosMiddleware.datosCompletos,
		async (req,res) => {
		const {nombreCompleto, correo, fechaNacimiento, pasaporte} = req.body;
		const usuario = new Usuario({
			nombreCompleto, correo, fechaNacimiento, pasaporte});
		const Pasaporte = await Usuario.find({pasaporte: pasaporte});
//Validar que no se este repitiendo el Numero de pasaporte 
		if(Pasaporte.length != 0) {
			res.send("Numero de Pasaporte Repetido");
		}else{
			const respuesta = await usuario.save();
			res.send("Usuario Guardado");
		}
	});

//eliminar uno	
	app.delete('/api/usuarios/:id', async (req, res) => {
		const usuarios = await Usuario.deleteOne({ _id: req.params.id });
		res.send(usuarios);
	});

//Editar Machin Uno 
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
	});
//Get solo un usuario
	app.get('/api/usuarios/:id', async(req, res) =>{
		const usuarios = await Usuario.find({ _id: req.params.id });
		res.send(usuarios);
	});

	/*app.get('/api/usuarios/:pasaporte', async(req, res) =>{
		const usuarios = await Usuario.find({ pasaporte: req.params.pasaporte });
		res.send(usuarios);
	});*/
};

