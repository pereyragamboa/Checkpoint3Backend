const mysql = require('mysql');
const reportarError = require('../lib/globalMiddleware').reportarError;

async function consultarBD(consulta, parametros, res, mensajeConfirmacion) {
  let connectionUri = null;

  if (process.env.NODE_ENV === 'production') {
    connectionUri = process.env.CLEARDB_DATABASE_URL;
  } else {
    connectionUri = require('./dev');
  }
  const connection = await mysql.createConnection(connectionUri);
  await connection.connect();

  await connection.query(consulta, parametros, (error, results) => {
    if (error) {
      reportarError(res, error);
    } else {
      res.send(mensajeConfirmacion ? mensajeConfirmacion : results);
    }
  });

  connection.end(err => {
    if (err) { console.log(err) }
  });
}

module.exports = { consultarBD };