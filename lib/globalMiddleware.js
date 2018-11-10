module.exports = (() => {
  const validarMayoriaEdad = (edad) => {
    const mayoriaEdad = new Date(
      edad.getFullYear() + 18, edad.getMonth(), edad.getDay(),
      edad.getHours(), edad.getMinutes(), edad.getSeconds()
    );
    return (mayoriaEdad > new Date());
  };
})();