const global = require('./globalMiddleware');
// El RegEx especifica dos secuencias de texto separadas por una arroba.
// Aparentemente validar el formato de una dirección de correo electrónico
// con RegEx es muy complicado. Una discusión al respecto se encuentra en
// https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression/201378
const REGEX_CORREO = new RegExp('\\S+@\\S+');
const TAMANHO_NOMBRE = 25;
const TAMANHO_CORREO = 60;
const USUARIO = 'usuario';

module.exports = (() => {
	const datosCompletos = (req, res, next) => {
		let listaCamposFaltantes = [];
		global.mensajeValidandoDatosCompletos(USUARIO);

		const { nombre, apellidoPaterno, correo, pasaporte, fechaNacimiento } = req.body;

		if (!nombre) listaCamposFaltantes.push('nombre');
		if (!apellidoPaterno) listaCamposFaltantes.push('apellidoPaterno');
		if (!correo) listaCamposFaltantes.push('correo');
		if (!pasaporte) listaCamposFaltantes.push('pasaporte');
		if (!fechaNacimiento) listaCamposFaltantes.push('fechaNacimiento');

		// En lugar de invocar res.send() cada vez que falla una validación,
		// se acumulan los errores, se reportan todos de una vez con res.send() y
		// termina la ejecución de app.METHOD() .
		// Si no hay errores, el middleware continúa y ejecuta next() .
		if (listaCamposFaltantes.length > 0) {
			global.reportarError(res, listaCamposFaltantes.map(
				(campo) => global.mensajeCampoNoDefinido(campo)
			));
		} else {
		  global.mensajeDatosCompletos(USUARIO);
			next();
		}
	};

	const datosPrimitivos = (req, res, next) => {
		let listaErrores = [];
		global.mensajeValidandoTiposDatos(USUARIO);

		const { nombre, apellidoPaterno, correo, pasaporte, fechaNacimiento } = req.body;

		if (typeof(nombre) !== 'string')
			listaErrores.push(global.mensajeTipoInvalido('nombre', 'string.'));
		if (typeof(apellidoPaterno) !== 'string')
			listaErrores.push(global.mensajeTipoInvalido('apellidoPaterno', 'string'));
		if (typeof(correo) !== 'string')
			listaErrores.push(global.mensajeTipoInvalido('correo', 'string'));
		if (typeof(pasaporte) !== 'number')
			listaErrores.push(global.mensajeTipoInvalido('pasaporte', 'number'));
		if (typeof(fechaNacimiento) !== 'string' || isNaN(Date.parse(fechaNacimiento)))
			listaErrores.push(global.mensajeFechaInvalida('fechaNacimiento'));

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
		if (!nombre.trim()) listaErrores.push(global.mensajeCampoVacio('nombre'));
		else if (nombre.trim().length > TAMANHO_NOMBRE) {
      listaErrores.push(global.mensajeCaracteresMaximos('nombre', TAMANHO_NOMBRE));
    }
		if (!apellidoPaterno.trim()) listaErrores.push(global.mensajeCampoVacio("apellidoPaterno"));
    else if (apellidoPaterno.trim().length > TAMANHO_NOMBRE) {
      listaErrores.push(global.mensajeCaracteresMaximos('apellidoPaterno', TAMANHO_NOMBRE));
    }
		if (!REGEX_CORREO.test(correo.trim())) listaErrores.push('"correo" no es una dirección válida.');
    else if (correo.trim().length > TAMANHO_CORREO) {
      listaErrores.push(global.mensajeCaracteresMaximos('correo', TAMANHO_CORREO));
    }
		if (fechaNacimiento > new Date()) listaErrores.push(
			global.mensajeFechaFutura('fechaNacimiento')
		);
		if (pasaporte <= 0 || pasaporte >= Math.pow(10, 9)) {
      listaErrores.push(global.mensajeDigitosMaximos('pasaporte', 9));
    }

		if (listaErrores.length > 0) {
      global.reportarError(res, listaErrores);
    } else {
		  global.mensajeDatosCorrectos(USUARIO);
			next();
		}
	};

	const validarApellidoMaterno = (req, res, next) => {
	  const { apellidoMaterno } = req.body;
	  const campo = 'apellidoMaterno';
	  if (!apellidoMaterno) {
	    req.body.apellidoMaterno = '';
	    next();
    } else if (typeof(apellidoMaterno) !== 'string') {
	    global.reportarError(res, [global.mensajeTipoInvalido(campo, 'string')]);
    } else if (apellidoMaterno.trim().length > TAMANHO_NOMBRE) {
	    global.reportarError(res, [global.mensajeCaracteresMaximos(campo, TAMANHO_NOMBRE)]);
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