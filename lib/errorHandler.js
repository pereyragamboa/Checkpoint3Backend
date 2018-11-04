const EOL = require('os').EOL;

const reportarError = (res, mensajesError) => {
  console.log(`\tERRORES = ${mensajesError.length}`);
  mensajesError.forEach(mensaje => {
    console.log(`\t* ${mensaje}`);
  });
  res.status(500).send(mensajesError.join(EOL));
};

module.exports = reportarError;