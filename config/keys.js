if (process.env.NODE_ENV === 'production') {
	module.exports = requiere('./prod');
}else{
	module.exports = requiere('./dev')
}