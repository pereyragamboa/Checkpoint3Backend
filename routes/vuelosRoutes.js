const { consultarBD } = require('../config/connection');
const middleware = require('../lib/vuelosMiddleware');

module.exports = (app) => {
  // Obtener todos los vuelos
  app.get('/api/vuelos', (req, res) => {
    consultarBD("SELECT * FROM vuelos", [], res);
  });

  // Obtener el vuelo con el ID indicado
  app.get('/api/vuelos/:id', (req, res) => {
    consultarBD('SELECT * FROM vuelos WHERE IDVuelo = ?', [req.params.id], res);
  });

    // Obtener usuario con # pasaporte
    app.get('/api/vuelos/usuario/:pasaporte', (req, res) => {
    consultarBD('SELECT * FROM vuelos WHERE pasaporte = ?', [req.params.pasaporte], res);
  });

  // Agregar un vuelo
  app.post('/api/vuelos/',
    middleware.datosCompletos,
    middleware.tiposCorrectos,
    middleware.datosValidos,
    (req, res) => {
      const { matriculaID, fechaSalida, fechaLlegada, origen, destino, ruta, idEstado } = req.body;
      consultarBD(
        'INSERT into VUELOS ' +
        '(matriculaID, fechaSalida, fechaLlegada, origen, destino, ruta, IDEstado) ' +
        'VALUES ( ?, ?, ?, ?, ?, ?, ? )',
        [ matriculaID, fechaSalida, fechaLlegada,
          origen.trim(), destino.trim(), ruta.trim().toUpperCase(), idEstado ],
        res, "Vuelo agregado exitosamente."
      );
  });

  // Modificar un vuelo
  app.post('/api/vuelos/:id',
    middleware.datosCompletos,
    middleware.tiposCorrectos,
    middleware.datosValidos,
    (req, res) => {
      const { matriculaID, fechaSalida, fechaLlegada, origen, destino, ruta, idEstado } = req.body;
      consultarBD(
        'UPDATE vuelos SET ' +
        'matriculaID = ?, fechaSalida = ?, fechaLlegada = ?, origen = ?, destino = ?, ' +
        'ruta = ?, IDEstado = ? ' +
        'WHERE IDVuelo = ?',
        [ matriculaID, fechaSalida, fechaLlegada, origen.trim(),
          destino.trim(), ruta.trim().toUpperCase(), idEstado, req.params.id ],
        res, "Vuelo modificado exitosamente.");
  });

  // Obtener lista de estados de vuelo
  app.get('/api/estados', (req, res) =>
    consultarBD('select * from estados', [], res)
  );

  // Obtener manifiesto de vuelo
  app.get('/api/vuelos/:id/manifiesto', (req, res) =>
    consultarBD(
      'SELECT u.IDUsuario, u.nombre, u.apellidoPaterno, u.apellidoMaterno FROM usuarios u ' +
      'JOIN manifiesto m WHERE u.IDUsuario = m.IDUsuario AND m.IDVuelo = ?',
      [ req.params.id ], res)
  );

  app.post('/api/vuelos/:id/manifiesto', (req, res) =>
    consultarBD(
      "INSERT INTO manifiesto (IDVuelo, IDUsuario) VALUES (?, ?)",
      [ req.params.id, req.body.idUsuario ], res,
      "Usuario agregado exitosamente al manifiesto."
    )
  );

  app.delete('/api/vuelos/:id/manifiesto/:uid', (req, res) =>
    consultarBD(
      "DELETE from manifiesto WHERE IDUsuario = ? AND IDVuelo = ?",
      [ req.params.id, req.params.uid ], res,
      "Usuario eliminado exitosamente del manifiesto."
    )
  );
};