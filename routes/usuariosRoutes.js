const { consultarBD } = require('../config/connection');
const reportarError = require('../lib/globalMiddleware').reportarError;
const usuariosMiddleware = require ('../lib/usuariosMiddleware');

module.exports = (app) => {

	app.get('/', async (req, res) =>{
		res.send("Equipo Chikorita");
	});

  // Get todos los Usuarios
	app.get('/api/usuarios', async (req, res) => {
    await consultarBD('SELECT * FROM `usuarios`', [], res);
	});

	//Enviar nuevo Usuario
	app.post(
		'/api/usuarios',
		usuariosMiddleware.datosCompletos,
		usuariosMiddleware.datosPrimitivos,
    usuariosMiddleware.datosValidos,
    usuariosMiddleware.validarApellidoMaterno,
    async (req, res) => {
		  try {
      const {
        nombre, apellidoPaterno, apellidoMaterno,
        correo, fechaNacimiento, pasaporte } = req.body;
      await consultarBD(
        "INSERT INTO usuarios (nombre, apellidoPaterno, apellidoMaterno, correo, fechaNacimiento, pasaporte)" +
        "VALUES ( ?, ?, ?, ?, ?, ? );",
        [ nombre.trim(), apellidoPaterno.trim(), apellidoMaterno.trim(),
          correo.trim(), fechaNacimiento, pasaporte ],
        res, "Usuario agregado exitosamente.");
      } catch (err) {
		    reportarError(err);
      }
		}
  );

  //Eliminar usuario
	app.delete('/api/usuarios/:id', async (req, res) => {
	  await consultarBD(
	    "DELETE FROM `usuarios` WHERE `IDUsuario` = ?",
      [req.params.id], res, "Usuario eliminado exitosamente.");
  });

	//Editar usuario
	app.post(
		'/api/usuarios/:id', 
		usuariosMiddleware.datosPrimitivos,
		usuariosMiddleware.datosCompletos,
		usuariosMiddleware.datosValidos,
		usuariosMiddleware.validarApellidoMaterno,
		async (req, res) => {
      const {
        nombre, apellidoPaterno, apellidoMaterno,
        correo, fechaNacimiento, pasaporte } = req.body;
      await consultarBD(
        "UPDATE `usuarios` " +
        "SET `nombre` = ?, `apellidoPaterno` = ?, `apellidoMaterno` = ?, " +
        "`correo` = ?, `fechaNacimiento` = ?, `pasaporte` = ? " +
        "WHERE `IDUsuario` = ?",
        [ nombre.trim(), apellidoPaterno.trim(), apellidoMaterno.trim(),
          correo.trim(), fechaNacimiento, pasaporte, req.params.id],
        res
      );
  	}
  );

	//Get solo un usuario
	app.get('/api/usuarios/:id', async(req, res) =>{
    await consultarBD(
      'SELECT * FROM `usuarios` WHERE `IDUsuario` = ?',
      [ req.params.id ], res
    );
	});

	// Obtener lista de vuelos del usuario
  app.get('/api/usuarios/:id/vuelos', async(req, res) => {
  })
};
