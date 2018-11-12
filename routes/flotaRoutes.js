const { consultarBD } = require('../config/connection');
const reportarError = require('../lib/errorHandler');

module.exports = (app) => {
  // Obtiene la flota de una aerolínea.
  app.get('/api/flota/:id', async (req, res) => {
    consultarBD(
      'SELECT * FROM flota WHERE IDFlota = ?',
      [req.params.id], (error, results) => {
        if (error) {
          reportarError(res, [error]);
        }
        else {
          res.send(results);
        }
      }
    )
  });

  // Obtiene un avión.
  app.get('/api/flota/matricula/:matricula', async (req, res) => {
    consultarBD(
      'SELECT * FROM flota WHERE matricula = ?',
      [req.params.matricula], (error, results) => {
        if (error) {
          reportarError(res, [error]);
        } else {
          res.send(results);
        }
      }
    )
  });

  // Agrega un avión.
  app.post('/api/flota/:id', async (req, res) => {
    const { matricula, capacidad } = req.body;
    await consultarBD(
      'INSERT INTO flota (idFlota, matricula, capacidad) VALUES (?, ?, ?)',
      [ req.params.id, matricula, capacidad ], error => {
        if (error) {
          reportarError(res, [error]);
        } else {
          res.send('Avión agregado exitosamente.');
        }
      }
    )
  });

  // Elimina un avión.
  app.delete('/api/flota/matricula/:id', async (req, res) => {
    await consultarBD(
      'DELETE FROM flota WHERE matricula = ?', [req.params.id],
      error => {
        if (error) {
          reportarError(res, [error]);
        } else {
          res.send('Avión eliminado exitosamente.');
        }
      }
    );
  })
};