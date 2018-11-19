const EOL = require('os').EOL;

const reportarError = (res, mensajesError) => {
  console.log(`\tERRORES = ${mensajesError.length}`);
  mensajesError.forEach(mensaje => {
    console.log(`\t* ${mensaje}`);
  });
  res.status(500).send(mensajesError.join(EOL));
};

const mensajeValidandoDatosCompletos = (entidad) =>
  console.log(`\tValidando completitud de datos de ${entidad}...`);

const mensajeDatosCompletos = (entidad) =>
  console.log(`\tDatos de ${entidad} completos.`);

const mensajeValidandoTiposDatos = (entidad) =>
  console.log(`\tValidando tipos de datos de ${entidad}`);

const mensajeTiposValidos = (entidad) =>
  console.log(`\tTodos los datos de ${entidad} son válidos.`);

const mensajeValidandoDatosCorrectos = (entidad) =>
  console.log(`\tValidando contenido de ${entidad}...`);

const mensajeDatosCorrectos = (entidad) =>
  console.log(`\tTodos los datos de ${entidad} son correctos.`);

const validarMayoriaEdad = (edad) => {
  const mayoriaEdad = new Date(
    edad.getFullYear() + 18, edad.getMonth(), edad.getDay(),
    edad.getHours(), edad.getMinutes(), edad.getSeconds()
  );
  return (mayoriaEdad > new Date());
};

const esTipoFecha = (valor) => typeof(valor) === 'string' && !isNaN(Date.parse(valor));

const mensajeCampoNoDefinido = (campo) => `${campo} no está definido.`;

const mensajeFechaInvalida = (campo) =>
  `"${campo}" debe ser de tipo "string" y contener una cadena de fecha ISO / JSON.`;

const mensajeTipoInvalido = (campo, tipo) => `"${campo}" debe ser de tipo "${tipo}"`;

const mensajeCampoVacio = (campo) => `"${campo}" está en blanco.`;

const mensajeCaracteresMaximos = (campo, longitud) =>
  `"${campo}" tiene más de ${longitud} caracteres.`;

const mensajeDigitosMaximos = (campo, digitos) =>
  `${campo} debe ser un número entre 1 y ${digitos} caracteres.`;

const mensajeFechaFutura = (campo) =>
  `${campo} debe ser una fecha anterior al presente.`;

module.exports = {
  reportarError,
  validarMayoriaEdad,
  mensajeValidandoDatosCompletos,
  mensajeDatosCompletos,
  mensajeValidandoTiposDatos,
  mensajeTiposValidos,
  mensajeValidandoDatosCorrectos,
  mensajeDatosCorrectos,
  esTipoFecha,
  mensajeCampoNoDefinido,
  mensajeTipoInvalido,
  mensajeCampoVacio,
  mensajeCaracteresMaximos,
  mensajeDigitosMaximos,
  mensajeFechaInvalida,
  mensajeFechaFutura
};