const mysql = require('mysql');

async function getDbConnection() {
  let connectionUri = null;

  if (process.env.NODE_ENV === 'production') {
    connectionUri = process.env.CLEARDB_DATABASE_URL;
  } else {
    connectionUri = require('./dev');
  }
  const connection = await mysql.createConnection(connectionUri);
  await connection.connect();
  return connection;
}

module.exports = { getDbConnection };