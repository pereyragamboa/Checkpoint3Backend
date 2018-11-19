const global = require('./globalMiddleware');
// Especifica una secuencia de tres letras mayúsculas.
const REGEX_CODIGO_AEROPUERTO = new RegExp(/[A-Z]{3}/);
const VUELO = 'vuelo';

const datosCompletos = (req, res, next) => {
  global.mensajeValidandoDatosCompletos(VUELO);
  const listaCamposFaltantes = [];
  const {
    matriculaID, fechaSalida, fechaLlegada,
    origen, destino, ruta, idEstado } = req.body;

  if (!matriculaID) listaCamposFaltantes.push('matriculaID');
  if (!fechaSalida) listaCamposFaltantes.push("fechaSalida");
  if (!fechaLlegada) listaCamposFaltantes.push("fechaLlegada");
  if (!origen) listaCamposFaltantes.push("origen");
  if (!destino) listaCamposFaltantes.push("destino");
  if (!ruta) listaCamposFaltantes.push("ruta");
  if (!idEstado) listaCamposFaltantes.push("idEstado");

  if (listaCamposFaltantes.length > 0) {
    global.reportarError(res,
      listaCamposFaltantes.map((campo) => global.mensajeCampoNoDefinido(campo)));
  } else {
    global.mensajeDatosCompletos(VUELO);
    next();
  }
};

const tiposCorrectos = (req, res, next) => {
  global.mensajeValidandoTiposDatos(VUELO);
  const listaErrores = [];
  const {
    matriculaID, fechaSalida, fechaLlegada,
    origen, destino, ruta, idEstado } = req.body;

  if (typeof(matriculaID) !== 'number') listaErrores.push(global.mensajeTipoInvalido('matriculaID', 'number'));
  if (!global.esTipoFecha(fechaSalida)) listaErrores.push(global.mensajeFechaInvalida("fechaSalida"));
  if (!global.esTipoFecha(fechaLlegada)) listaErrores.push(global.mensajeFechaInvalida("fechaLlegada"));
  if (typeof(origen) !== 'string') listaErrores.push(global.mensajeTipoInvalido('origen', 'string'));
  if (typeof(destino) !== 'string') listaErrores.push(global.mensajeTipoInvalido('destino', 'string'));
  if (typeof(ruta) !== 'string') listaErrores.push(global.mensajeTipoInvalido('ruta', 'string'));
  if (typeof(idEstado) !== 'number') listaErrores.push(global.mensajeTipoInvalido('idEstado', 'number'));

  if (listaErrores.length > 0) {
    global.reportarError(res, listaErrores);
  } else {
    global.mensajeTiposValidos(VUELO);
    next();
  }
};

const datosValidos = (req, res, next) => {
  global.mensajeValidandoDatosCorrectos(VUELO);
  const listaErrores = [];
  const { matriculaID, fechaSalida, fechaLlegada, origen, destino, ruta } = req.body;

  if (matriculaID < 0 || matriculaID > Math.pow(10, 11))
    listaErrores.push(global.mensajeDigitosMaximos('matriculaID', 11));
  if (Date.parse(fechaSalida) > Date.parse(fechaLlegada))
    listaErrores.push("La fecha de salida no puede ser posterior a la fecha de llegada.");
  if (!REGEX_CODIGO_AEROPUERTO.test(origen.trim())) listaErrores.push(mensajeUbicacionInvalida("origen"));
  if (!REGEX_CODIGO_AEROPUERTO.test(destino.trim())) listaErrores.push(mensajeUbicacionInvalida("destino"));
  if (origen.trim() === destino.trim()) listaErrores.push("'origen' debe ser distinto a 'destino'.");
  if (!ruta.trim()) listaErrores.push(global.mensajeCampoVacio('ruta'));
  if (ruta.trim().length > 6) listaErrores.push(global.mensajeCaracteresMaximos('ruta', 6));

  if (listaErrores.length > 0) {
    global.reportarError(res, listaErrores);
  } else {
    global.mensajeDatosCompletos(VUELO);
    next();
  }
};

const mensajeUbicacionInvalida = (campo) => `${campo} debe ser un código de aeropuerto de tres caracteres.`;

module.exports = { datosCompletos, tiposCorrectos, datosValidos };