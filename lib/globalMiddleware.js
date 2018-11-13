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

module.exports = {
  reportarError,
  validarMayoriaEdad,
  mensajeValidandoDatosCompletos,
  mensajeDatosCompletos,
  mensajeValidandoTiposDatos,
  mensajeTiposValidos,
  mensajeValidandoDatosCorrectos,
  mensajeDatosCorrectos
};