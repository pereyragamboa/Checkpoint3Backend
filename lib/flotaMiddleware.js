const global = require('./globalMiddleware');
const CAPACIDAD_MAXIMA = 300;
const FLOTA = 'flota';

const datosCompletos = (req, res, next) => {
  global.mensajeValidandoDatosCompletos(FLOTA);
  const listaErrores = [];
  const { matricula, capacidad } = req.body;

  if (!matricula) listaErrores.push('Matricula es igual a cero o no está definida.');
  if (!capacidad) listaErrores.push('Capacidad es igual a cero o no está definida.');

  if (listaErrores.length > 0) {
    global.reportarError(res, listaErrores);
  } else {
    global.mensajeDatosCompletos(FLOTA);
    next();
  }
};

const tiposCorrectos = (req, res, next) => {
  global.mensajeValidandoTiposDatos(FLOTA);
  const listaErrores = [];
  const { matricula, capacidad } = req.body;

  if (typeof(matricula) !== 'number') listaErrores.push("Matricula debe ser de tipo Number.");
  if (typeof(capacidad) !== 'number') listaErrores.push("Capacidad debe ser de tipo Number.");

  if (listaErrores.length > 0) {
    global.reportarError(res, listaErrores);
  } else {
    global.mensajeTiposValidos(FLOTA);
    next();
  }
};

const datosValidos = (req, res, next) => {
  const {capacidad} = req.body;
  global.mensajeValidandoDatosCompletos(FLOTA);
  if (capacidad > CAPACIDAD_MAXIMA) {
    global.reportarError(res, [`Capacidad debe ser menor o igual a ${CAPACIDAD_MAXIMA}.`]);
  } else {
    global.mensajeDatosCompletos(FLOTA);
    next();
  }
};

const revisarCapacidad = (req, res, next) => {
  const { capacidad } = req.body;
  if (!capacidad) global.reportarError('Capacidad no está definido o es igual a cero.');
  else if (typeof(capacidad) !== 'number')
    global.reportarError('Capacidad debe ser de tipo Number.');
  else if (capacidad < 0 || capacidad > CAPACIDAD_MAXIMA)
    global.reportarError(`Capacidad debe ser menor o igual a ${CAPACIDAD_MAXIMA}.`);
  else next();
};

module.exports = { datosCompletos, tiposCorrectos, datosValidos, revisarCapacidad };