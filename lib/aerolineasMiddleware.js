const reportarError = require('./errorHandler');

module.exports = (() => {
  const flotaDuplicada = (req, res, next) => {
    let duplicados = [];
    let nulos = 0;
    console.log("\tValidando aviones duplicados...");

    const { flota } = req.body;
    if (!flota) {
      duplicados.push("Falta Flota.");
    } else {
      let matricula = null;
      for (let i = 0; i < flota.length; i++) {
        matricula = flota[i].matricula;
        if (!matricula) {
          nulos++;
        } else if (flota.findIndex(item => item.matricula === matricula) !== i) {
          duplicados.push(matricula);
        }
      }
    }

    let listaErrores = [];
    if (nulos > 0) {
      listaErrores.push(`La flota contiene ${nulos} matrícula(s) nula(s).`)
    }
    if (duplicados.length > 0) {
      listaErrores.push(
        `La flota contiene las siguientes matrículas duplicadas: 
        ${duplicados.join(', ')}`)
    }

    if (listaErrores.length > 0) {
      reportarError(res, listaErrores);
    } else {
      next();
    }
  };

  return { flotaDuplicada };
})();