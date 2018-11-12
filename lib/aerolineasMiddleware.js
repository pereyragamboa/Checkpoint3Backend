const reportarError = require('./errorHandler');

module.exports = (() => {
  const datosCompletos = (req, res, next) => {
    let listaErrores = [];
    console.log('\tValidando completitud de datos de aerolínea...');

    const { nombre, nacionalidad } = req.body;

    if (!nombre) listaErrores.push('Falta `nombre`.');
    if (!nacionalidad) listaErrores.push('Falta `nacionalidad`.');

    if (listaErrores.length > 0) {
      reportarError(res, listaErrores);
    } else {
      console.log('\tDatos de aerolínea completos.');
      next();
    }
  };

  const tiposCorrectos = (req, res, next) => {
    let listaErrores = [];
    console.log('\tValidando tipos de datos de aerolínea...');

    const { nombre, nacionalidad } = req.body;
    if (typeof(nombre) !== 'string') listaErrores.push('`nombre` debe ser String.');
    if (typeof(nacionalidad) !== 'string') listaErrores.push('`nacionalidad` debe ser String.');

    if (listaErrores.length > 0) {
      reportarError(res, listaErrores);
    } else {
      console.log('\tTipos de datos de aerolínea correctos.');
      next();
    }
  };

  const datosValidos = (req, res, next) => {
    const listaErrores = [];
    console.log('\tValidando contenido de datos de aerolínea...');
    const { nombre, nacionalidad } = req.body;
    if (!nombre.trim()) listaErrores.push('`nombre` está en blanco.');
    if (!nacionalidad.trim()) listaErrores.push('`nacionalidad` está en blanco.');

    if (listaErrores.length > 0) {
      reportarError(res, listaErrores);
    } else {
      console.log('\tContenido de aerolínea correcto.');
      next();
    }
  };

  return { datosCompletos, tiposCorrectos, datosValidos };
})();