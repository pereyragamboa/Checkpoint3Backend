const { consultarBD } = require('../config/connection');
const reportarError = require('../lib/errorHandler');
const usuariosMiddleware = require ('../lib/usuariosMiddleware');

module.exports = (app) => {

	app.get('/', async (req, res) =>{
		res.send("Equipo Chikorita");
	});

  // Get todos los Usuarios
	app.get('/api/usuarios', async (req,res) => {
    await consultarBD('SELECT * FROM `usuarios`', [], (error, results) => {
      if (error) {
        reportarError(res, [error]);
      } else {
        res.send(results);
      }
    });
	});

	//Enviar nuevo Usuario
	app.post(
		'/api/usuarios',
		usuariosMiddleware.datosCompletos,
		usuariosMiddleware.datosPrimitivos,
    usuariosMiddleware.datosValidos,
    async (req, res) => {
      const {
        nombre, apellidoPaterno, apellidoMaterno,
        correo, fechaNacimiento, pasaporte } = req.body;
      await consultarBD(
        "INSERT INTO `usuarios` (nombre, apellidoPaterno, apellidoMaterno, correo, fechaNacimiento, pasaporte)" +
        "VALUES ( ?, ?, ?, ?, ?, ? );",
        [ nombre.trim(), apellidoPaterno.trim(), apellidoMaterno.trim(),
          correo.trim(), fechaNacimiento, pasaporte ],
        (error) => {
          if (error) {
            reportarError(res, [error]);
          } else {
            res.send("Usuario agregado exitosamente.");
          }
        }
      );
    }
  );

  //Eliminar usuario
	app.delete('/api/usuarios/:id', async (req, res) => {
	  await consultarBD(
	    "DELETE FROM `usuarios` WHERE `IDUsuario` = ?",
      [req.params.id], (error, results) => {
	      if (error) {
          reportarError(res, [error]);
        } else {
	        res.send("Usuario eliminado exitosamente.");
        }
      });
	});

	//Editar usuario
	app.post(
		'/api/usuarios/:id', 
		usuariosMiddleware.datosPrimitivos,
		usuariosMiddleware.datosCompletos,
		usuariosMiddleware.datosValidos,
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
        (error, result) => {
          if (error) {
            reportarError(res, [error]);
          } else {
            res.send(result);
          }
        }
      );
  	}
  );

	//Get solo un usuario
	app.get('/api/usuarios/:id', async(req, res) =>{
    await consultarBD(
      'SELECT * FROM `usuarios` WHERE `IDUsuario` = ?',
      [ req.params.id ], (error, results) => {
      if (error) {
        reportarError(res, [error]);
      } else {
        res.send(results);
      }
    });
	});
};
