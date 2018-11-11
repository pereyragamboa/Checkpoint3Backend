const { getDbConnection } = require('../config/connection');
const reportarError = require('../lib/errorHandler');
const usuariosMiddleware = require ('../lib/usuariosMiddleware');

module.exports = (app) => {

	app.get('/', async (req, res) =>{
		res.send("Equipo Chikorita");
	});

  // Get todos los Usuarios
	app.get('/api/usuarios', async (req,res) => {
    const connection = await getDbConnection();
    await connection.query('SELECT * FROM `usuarios`', (error, results) => {
      if (error) {
        reportarError(res, [error]);
      } else {
        res.send(results);
      }
    });
    connection.end(err => {
      if (err) { console.log(err) }
    });
	});

	//Enviar nuevo Usuario
	app.post(
		'/api/usuarios',
		usuariosMiddleware.datosCompletos,
		usuariosMiddleware.datosPrimitivos,
    async (req, res) => {
      const {
        nombre, apellidoPaterno, apellidoMaterno,
        correo, fechaNacimiento, pasaporte } = req.body;
      const connection = await getDbConnection();
      connection.query(
        "INSERT INTO `usuarios` (nombre, apellidoPaterno, apellidoMaterno, correo, fechaNacimiento, pasaporte)" +
        "VALUES ( ?, ?, ?, ?, ?, ? );",
        [nombre, apellidoPaterno, apellidoMaterno, correo, fechaNacimiento, pasaporte],
        (error) => {
          if (error) {
            reportarError([error]);
          } else {
            res.send("Usuario agregado exitosamente.");
          }
        }
      );
      connection.end(err => {
        if (err) { console.log(err) }
      });
      //res.send(respuesta);
    }
  );

  //Eliminar usuario
	app.delete('/api/usuarios/:id', async (req, res) => {
	  const connection = await getDbConnection();
	  await connection.query(
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
		async (req, res) => {
      const {
        nombre, apellidoPaterno, apellidoMaterno,
        correo, fechaNacimiento, pasaporte } = req.body;
      const connection = await getDbConnection();
      connection.query(
        "UPDATE `usuarios` " +
        "SET `nombre` = ?, `apellidoPaterno` = ?, `apellidoMaterno` = ?, " +
        "`correo` = ?, `fechaNacimiento` = ?, `pasaporte` = ? " +
        "WHERE `IDUsuario` = ?",
        [nombre, apellidoPaterno, apellidoMaterno,
          correo, fechaNacimiento, pasaporte, req.params.id],
        (error, result) => {
          if (error) {
            reportarError(res, [error]);
          } else {
            res.send(result);
          }
        }
      );
      connection.end(err => {
        if (err) { console.log(err) }
      });
  	}
  );

	//Get solo un usuario
	app.get('/api/usuarios/:id', async(req, res) =>{
    const connection = await getDbConnection();
    await connection.query(
      'SELECT * FROM `usuarios` WHERE `IDUsuario` = ?',
      [ req.params.id ], (error, results) => {
      if (error) {
        reportarError(res, [error]);
      } else {
        res.send(results);
      }
    });
    connection.end(err => {
      if (err) { console.log(err) }
    });
	});
};

