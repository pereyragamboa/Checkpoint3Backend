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
  app.get('/api/vuelos/estados', (req, res) =>
    consultarBD('SELECT * FROM estados', [], res)
  );

};