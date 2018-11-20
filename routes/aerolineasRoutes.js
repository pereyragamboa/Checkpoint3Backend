const { consultarBD } = require('../config/connection');
const middleware = require('../lib/aerolineasMiddleware');

module.exports = (app) => {

  // Obtiene todas las aerolíneas.
  app.get('/api/aerolineas', async(req, res) => {
    consultarBD(
      'SELECT * FROM aerolineas', [], res);
  });

  // Obtiene la aerolínea con el ID indicado.
  app.get('/api/aerolineas/:id', async(req, res) => {
    // Consulta la aerolínea
    consultarBD(
      'SELECT * FROM aerolineas WHERE IDAerolinea = ?',
      [req.params.id], res);
  });

  // Agrega una aerolínea.
  app.post(
    '/api/aerolineas',
    middleware.tiposCorrectos,
    middleware.datosCompletos,
    middleware.datosValidos,
    async (req, res) => {
      console.log("\t=> Preparando aerolínea...");
      const {nombre, nacionalidad} = req.body;
      await consultarBD(
        'INSERT INTO aerolineas (nombre, nacionalidad) VALUES ( ?, ? )',
        [nombre.trim(), nacionalidad.trim()],
        res, 'Aerolínea agregada exitosamente.');
    });

  // Modifica una aerolínea.
  app.post('/api/aerolineas/:id',
    middleware.tiposCorrectos,
    middleware.datosCompletos,
    middleware.datosValidos,
    async (req, res) => {
      const { nombre, nacionalidad } = req.body;
      await consultarBD(
        'UPDATE aerolineas SET nombre = ?, nacionalidad = ? WHERE IDFlota = ?',
        [ nombre, nacionalidad, req.params.id ], res, "Aerolínea modificada exitosamente.");
  });

  // Elimina una aerolínea.
  app.delete('/api/aerolineas/:id', async (req, res) => {
    await consultarBD(
      'UPDATE aerolineas SET activo = 0 WHERE IDAerolinea = ?', [req.params.id],
      res, 'Aerolínea eliminada exitosamente.');
  });
};