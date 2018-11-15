 const { consultarBD } = require('../config/connection');
const middleware = require('../lib/flotaMiddleware');

module.exports = (app) => {
  // Obtiene la flota de una aerolínea.
  app.get('/api/flota/:id', async (req, res) => {
    consultarBD(
      'SELECT * FROM flota WHERE IDFlota = ?',
      [req.params.id], res);
  });

  // Obtiene un avión.
  app.get('/api/flota/matricula/:matricula', async (req, res) => {
    consultarBD(
      'SELECT * FROM flota WHERE matricula = ?',
      [req.params.matricula], res);
  });

  // Agrega un avión a la flota de una aerolínea.
  app.post('/api/flota/:id',
    middleware.datosCompletos,
    middleware.tiposCorrectos,
    middleware.datosValidos,
    async (req, res) => {
      const { matricula, capacidad } = req.body;
      await consultarBD(
        'INSERT INTO flota (idFlota, matricula, capacidad) VALUES (?, ?, ?)',
        [ req.params.id, matricula, capacidad ],
        res, 'Avión agregado exitosamente.');
    });

  app.post('/api/flota/matricula/:matricula',
    middleware.revisarCapacidad,
    async (req, res) => {
      await consultarBD(
        'UPDATE flota (capacidad) VALUES (?)', [req.body.capacidad],
        res, 'Avión modificado exitosamente.');
    });

  app.post('/api/flota/matricula/:matricula',
    middleware.revisarCapacidad,
    async (req, res) => {
      await consultarBD(
        'UPDATE flota (capacidad) VALUES (?)', [req.body.capacidad],
        res, 'Avión modificado exitosamente.');
  });

  // Elimina un avión.
  app.delete('/api/flota/matricula/:id', async (req, res) => {
    await consultarBD(
      'UPDATE flota SET activo = NOT activo WHERE matricula = ?', [req.params.id],
      res, 'Avión eliminado exitosamente.');
    });
};