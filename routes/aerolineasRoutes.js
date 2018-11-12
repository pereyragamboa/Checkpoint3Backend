const { consultarBD } = require('../config/connection');
const middleware = require('../lib/aerolineasMiddleware');
const reportarError = require('../lib/errorHandler');

module.exports = (app) => {

  // Obtiene todas las aerolíneas.
  app.get('/api/aerolineas', async(req, res) => {
    consultarBD(
      'SELECT * FROM aerolineas', [],
      (error, results) => {
        if (error) {
          reportarError(res, [error])
        } else {
          res.send(results);
        }
      }
    )
  });

  // Obtiene la aerolínea con el ID indicado.
  app.get('/api/aerolineas/:id', async(req, res) => {
    // Consulta la aerolínea
    consultarBD(
      'SELECT * FROM aerolineas WHERE IDAerolinea = ?',
      [req.params.id], (error, results) => {
        if (error) {
          reportarError(res, [error]);
        } else {
          res.send(results);
        }
      }
    );
  });

  // Obtiene la flota de la aerolínea con el ID indicado.
  app.get('/api/flota/:id', async(req, res) => {
    // Consulta la flota
    consultarBD(
      'SELECT * FROM flota WHERE IDFlota = ?',
      [req.params.id], (error, results) => {
        if (error) {
          reportarError(res, [error]);
        } else {
          res.send(results);
        }
      }
    );
  });

  // Agrega una aerolínea.
  app.post(
    '/api/aerolineas',
    middleware.tiposCorrectos,
    middleware.datosCompletos,
    middleware.datosValidos,
    async (req, res) => {
      console.log("\t=> Preparando aerolínea...");
      const { nombre, nacionalidad } = req.body;
      await consultarBD(
        'INSERT INTO aerolineas (nombre, nacionalidad) VALUES ( ?, ? )',
        [ nombre.trim(), nacionalidad.trim() ], (error) => {
          if (error) {
            reportarError(res, [error]);
          } else {
            res.send('Aerolínea agregada exitosamente.');
          }
        }
      )
    }
  );

  // Modifica una aerolínea.
  app.post('/api/aerolineas/:id',
    middleware.tiposCorrectos,
    middleware.datosCompletos,
    middleware.datosValidos,
    async (req, res) => {
      const { nombre, nacionalidad } = req.body;
      await consultarBD(
        'UPDATE aerolineas SET nombre = ?, nacionalidad = ? WHERE IDFlota = ?',
        [ nombre, nacionalidad, req.params.id ], (error, results) => {
          if (error) {
            reportarError(res, [error]);
          } else {
            res.send(results);
          }
        }
      )
  });

  // Elimina una aerolínea.
  // TODO: Revisar transacciones
  app.delete('/api/aerolineas/:id', async (req, res) => {
    const idAerolinea = req.params.id;
    await consultarBD(
      'DELETE FROM flota WHERE IDFlota = ?', [ idAerolinea ],
      async (error) => {
        if (error) {
          reportarError(res, [error]);
        } else {
          await consultarBD(
            'DELETE FROM aerolineas WHERE IDAerolinea = ?', [ idAerolinea ],
            (error) => {
              if (error) {
                reportarError(res, [error]);
              } else {
                res.send('Aerolínea eliminada exitosamente.');
              }
            }
          );
        }
      }
    );
  });
};