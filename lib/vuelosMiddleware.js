const global = require('./globalMiddleware');
const VUELO = 'vuelo';

const datosCompletos = (req, res, next) => {
  global.mensajeValidandoDatosCompletos(VUELO);
  const listaErrores = [];
  const {
    matriculaID, fechaSalida, fechaLlegada,
    origen, destino, ruta, idEstado } = req.body;

  if (!matriculaID) listaErrores.push("Matricula no está definido.");
  if (!fechaSalida) listaErrores.push("FechaSalida no está definido.");
  if (!fechaLlegada) listaErrores.push("FechaLlegada no está definido.");
  if (!origen) listaErrores.push("Origen no está definido.");
  if (!destino) listaErrores.push("Destino no está definido.");
  if (!ruta) listaErrores.push("Ruta no está definido.");
  if (!idEstado) listaErrores.push("IdEstado no está definido.");

  if (listaErrores.length > 0) {
    global.reportarError(res, listaErrores);
  } else {
    global.mensajeDatosCompletos(VUELO);
    next();
  }
};