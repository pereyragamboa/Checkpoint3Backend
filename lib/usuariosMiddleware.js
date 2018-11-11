const reportarError = require('./errorHandler');

module.exports = (() => {
	const datosCompletos = (req, res, next) => {
		let listaErrores = [];
		console.log('\tValidando completitud de datos...');

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
			reportarError(res, listaErrores);
		} else {
			console.log('\tDatos completos.');
			next();
		}
	};

	const datosPrimitivos = (req, res, next) => {
		let listaErrores = [];
		console.log('\tValidando tipos de datos...');

		const { nombre, apellidoPaterno, apellidoMaterno, correo, pasaporte, fechaNacimiento } = req.body;

		if (typeof(nombre) !== 'string') listaErrores.push( '`nombre` debe ser String.');
		if (typeof(apellidoPaterno) !== 'string') listaErrores.push( '`apellidoPaterno` debe ser String.');
		if (typeof(apellidoMaterno) !== 'string') listaErrores.push( 'apellidoMaterno debe ser String.');
		if (typeof(correo) !== 'string') listaErrores.push( 'correo debe ser String.');
		if (typeof(pasaporte) !== 'number') listaErrores.push( 'pasaporte debe ser Number.');
		if (typeof(fechaNacimiento) !== 'string' || isNaN(Date.parse(fechaNacimiento)))
			listaErrores.push( 'fechaNacimiento debe ser un String conteniendo una fecha en formato ISO 8601.');

		if (listaErrores.length > 0) {
			reportarError(res, listaErrores)
		} else {
      console.log('\tTodos los datos son válidos.');
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
		datosCompletos
	}
})();