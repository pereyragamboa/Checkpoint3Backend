const global = require('./globalMiddleware');
const AEROLINEA = 'aerolínea';

module.exports = (() => {
  const datosCompletos = (req, res, next) => {
    global.mensajeValidandoDatosCorrectos(AEROLINEA);
    const listaErrores = [];
    const { nombre, nacionalidad } = req.body;

    if (!nombre) listaErrores.push('Falta `nombre`.');
    if (!nacionalidad) listaErrores.push('Falta `nacionalidad`.');

    if (listaErrores.length > 0) {
      global.reportarError(res, listaErrores);
    } else {
      global.mensajeDatosCompletos(AEROLINEA);
      next();
    }
  };

  const tiposCorrectos = (req, res, next) => {
    let listaErrores = [];
    global.mensajeValidandoTiposDatos(AEROLINEA);

    const { nombre, nacionalidad } = req.body;
    if (typeof(nombre) !== 'string') listaErrores.push('`nombre` debe ser String.');
    if (typeof(nacionalidad) !== 'string') listaErrores.push('`nacionalidad` debe ser String.');

    if (listaErrores.length > 0) {
      reportarError(res, listaErrores);
    } else {
      global.mensajeTiposValidos(AEROLINEA);
      next();
    }
  };

  const datosValidos = (req, res, next) => {
    global.mensajeValidandoDatosCorrectos(AEROLINEA);
    const listaErrores = [];
    const { nombre, nacionalidad } = req.body;
    if (!nombre.trim()) listaErrores.push('`nombre` está en blanco.');
    if (!nacionalidad.trim()) listaErrores.push('`nacionalidad` está en blanco.');

    if (listaErrores.length > 0) {
      reportarError(res, listaErrores);
    } else {
      global.mensajeDatosCorrectos(AEROLINEA);
      next();
    }
  };

  return { datosCompletos, tiposCorrectos, datosValidos };
})();