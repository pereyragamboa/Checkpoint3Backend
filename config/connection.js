const mysql = require('mysql');

async function consultarBD(query, input, callback) {
  let connectionUri = null;

  if (process.env.NODE_ENV === 'production') {
    connectionUri = process.env.CLEARDB_DATABASE_URL;
  } else {
    connectionUri = require('./dev');
  }
  const connection = await mysql.createConnection(connectionUri);
  await connection.connect();

  await connection.query(query, input, callback);

  connection.end(err => {
    if (err) { console.log(err) }
  });
}

module.exports = { consultarBD };