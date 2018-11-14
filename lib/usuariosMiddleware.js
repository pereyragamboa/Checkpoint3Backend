const global = require('./globalMiddleware');
// El RegEx especifica básicamente dos secuencias de texto separadas por una arroba.
// Aparentemente validar el formato de una dirección de correo electrónico
// es muy complicado. Una discusión al respecto se encuentra en
// https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression/201378
const REGEX_CORREO = new RegExp('\\S+@\\S+');
const TAMANHO_NOMBRE = 25;
const TAMANHO_CORREO = 60;
const USUARIO = 'usuario';

module.exports = (() => {
	const datosCompletos = (req, res, next) => {
		let listaErrores = [];
		global.mensajeValidandoDatosCompletos(USUARIO);

		const { nombre, apellidoPaterno, correo, pasaporte, fechaNacimiento } = req.body;

		if (!nombre) listaErrores.push('Falta Nombre');
		if (!apellidoPaterno) listaErrores.push('Falta Apellido Paterno');
		if (!correo) listaErrores.push('Falta correo');
		if (!pasaporte) listaErrores.push('Falta Pasaporte');
		if (!fechaNacimiento) listaErrores.push('Falta Fecha de Nacimiento');

		// En lugar de invocar res.send() cada vez que falla una validación,
		// se acumulan los errores, se reportan todos de una vez con res.send() y
		// termina la ejecución de app.METHOD() .
		// Si no hay errores, el middleware continúa y ejecuta next() .
		if (listaErrores.length > 0) {
			global.reportarError(res, listaErrores);
		} else {
		  global.mensajeDatosCompletos(USUARIO);
			next();
		}
	};

	const datosPrimitivos = (req, res, next) => {
		let listaErrores = [];
		global.mensajeValidandoTiposDatos(USUARIO);

		const { nombre, apellidoPaterno, apellidoMaterno, correo, pasaporte, fechaNacimiento } = req.body;

		if (typeof(nombre) !== 'string') listaErrores.push('`nombre` debe ser String.');
		if (typeof(apellidoPaterno) !== 'string') listaErrores.push('`apellidoPaterno` debe ser String.');
		if (apellidoMaterno && (apellidoMaterno) !== 'string')
			listaErrores.push('apellidoMaterno debe ser String.');
		if (typeof(correo) !== 'string') listaErrores.push('correo debe ser String.');
		if (typeof(pasaporte) !== 'number') listaErrores.push('pasaporte debe ser Number.');
		if (typeof(fechaNacimiento) !== 'string' || isNaN(Date.parse(fechaNacimiento)))
			listaErrores.push('fechaNacimiento debe ser un String conteniendo una fecha en formato ISO 8601.');

		if (listaErrores.length > 0) {
			global.reportarError(res, listaErrores)
		} else {
		  global.mensajeTiposValidos(USUARIO);
      next();
    }
	};

	const datosValidos = (req, res, next) => {
		const listaErrores = [];
    global.mensajeValidandoDatosCorrectos(USUARIO);

    const { nombre, apellidoPaterno, correo, pasaporte, fechaNacimiento } = req.body;
		if (!nombre.trim()) listaErrores.push("Nombre está en blanco.");
		else if (nombre.trim().length > TAMANHO_NOMBRE)
		  listaErrores.push(`Nombre tiene una longitud máxima de ${TAMANHO_NOMBRE} caracteres.`);
		if (!apellidoPaterno.trim()) listaErrores.push("ApellidoPaterno está en blanco.");
    else if (apellidoPaterno.trim().length > TAMANHO_NOMBRE)
      listaErrores.push(`ApellidoPaterno tiene una longitud máxima de ${TAMANHO_NOMBRE} caracteres.`);
		if (!REGEX_CORREO.test(correo.trim())) listaErrores.push('Correo no es una dirección válida.');
    else if (correo.trim().length > TAMANHO_CORREO)
      listaErrores.push(`Correo tiene una longitud máxima de ${TAMANHO_CORREO} caracteres.`);
		if (fechaNacimiento > new Date()) listaErrores.push('FechaNacimiento es una fecha futura.');
		if (pasaporte <= 0) listaErrores.push('Pasaporte debe ser un número positivo.');

		if (listaErrores.length > 0) {
      global.reportarError(res, listaErrores);
    } else {
		  global.mensajeDatosCorrectos(USUARIO);
			next();
		}
	};

	const validarApellidoMaterno = (req, res, next) => {
	  const { apellidoMaterno } = req.body;
	  if (!apellidoMaterno) {
	    req.body.apellidoMaterno = '';
	    next();
    } else if (typeof(apellidoMaterno) !== 'string') {
	    global.reportarError(res, 'ApellidoMaterno debe ser string.');
    } else if (apellidoMaterno.trim().length > TAMANHO_NOMBRE) {
	    global.reportarError(res, `ApellidoMaterno tiene una longitud máxima de ${TAMANHO_NOMBRE}`);
    } else {
	    console.log("\tEl apellido materno es válido.");
	    next();
    }
  };

	calcularFecha =(fecha) => {
		fecha = fecha.split('/')
		if(fecha.length != 3) return 0
		let birthDay = fecha[0]
		let birthMonth = fecha[1]
		let birthYear = fecha[2]

	    let currentDate = new Date();
	    let currentYear = currentDate.getFullYear();
	    let currentMonth = currentDate.getMonth();
	    let currentDay = currentDate.getDate();
	    let calculatedAge = currentYear - birthYear;

	    if (birthMonth - 1 == currentMonth && currentDay < birthDay) {
	        calculatedAge--;
	    }

	    return calculatedAge;
	};

	return {
		datosPrimitivos,
		datosCompletos,
		datosValidos,
    validarApellidoMaterno
	}
})();