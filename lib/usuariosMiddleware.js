module.exports = (() => {
	const datosCompletos = (req, res, next) => {
		const { nombreCompleto, correo, pasaporte, fechaNacimiento } = req.body;
		const {nombre, apellidoPaterno} = nombreCompleto;

		if(!nombre.trim()) res.send('Falta Nombre');
		if(!apellidoPaterno.trim()) res.send('Falta Apellido Paterno');

		if(!correo.trim()) res.send('Falta correo');
		if(!pasaporte.trim()) res.send('Falta Pasaporte');

		if(calcularFecha(fechaNacimiento) < 18) res.send('Edad minima 18');
		next();
	};

	const datosPrimitivos = (req, res, next) => {
		const { nombreCompleto, correo, pasaporte, fechaNacimiento } = req.body;
		const {nombre, apellidoPaterno, apellidoMaterno} = nombreCompleto;

		if(typeof(nombre) != 'string') res.send('validar nombre');
		if(typeof(apellidoPaterno) != 'string') res.send('validar apellido Paterno');
		if(typeof(apellidoMaterno) != 'string') res.send('validar apellido Materno');
		if(typeof(correo) != 'string') res.send('validar correo');
		if(typeof(pasaporte) != 'string') res.send('validar pasaporte');
		if(typeof(fechaNacimiento) != 'string') res.send('validar fecha Nacimiento');

		next();

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
	}
	return{
		datosPrimitivos,
		datosCompletos
	}
})();