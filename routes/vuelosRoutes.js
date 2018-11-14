const { consultarBD } = require('../config/connection');

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
  app.post('/api/vuelos/', (req, res) => {
    const { matricula, fechaSalida, fechaLlegada, origen, destino, ruta, estado } = req.body;
    consultarBD(
      'INSERT into VUELOS ' +
      '(matriculaID, fechaSalida, fechaLlegada, origen, destino, ruta, IDEstado) ' +
      'VALUES ( ?, ?, ?, ?, ?, ?, ? )',
      [ matricula, fechaSalida, fechaLlegada, origen, destino, ruta, estado ],
      res, "Vuelo agregado exitosamente."
    );
  });

  // Modificar un vuelo
  app.post('/api/vuelos/:id', (req, res) => {
    const { matricula, fechaSalida, fechaLlegada, origen, destino, ruta, estado } = req.body;
    consultarBD(
      'UPDATE vuelos SET ' +
      'matriculaID = ?, fechaSalida = ?, fechaLlegada = ?, origen = ?, destino = ?, ' +
      'ruta = ?, IDEstado = ? ' +
      'WHERE IDVuelo = ?',
      [ matricula, fechaSalida, fechaLlegada, origen, destino, ruta, estado, req.params.id ],
      res);
  });

  // Obtener lista de estados de vuelo
  app.get('/api/vuelos/estados', (req, res) =>
    consultarBD('SELECT * FROM estados', [], res)
  );
};