# MySQL en Node.js

Este proyecto usa el paquete `mysql`.

## Instalación

`$ npm install mysql`

## Uso de `mysql`

### Flujo de sucesos

`mysql` trabaja con conexiones de la siguiente manera:
* **Inicializar conexión**. Se indican los parámetros de la conexión. Puede hacerse mediante un URI (el método usado por esta aplicación) o mediente un objeto.

  Es importante mencionar que la conexión es asíncrona.
* **Hacer conexión**.
* **Hacer consulta**. Se envía una sentencia SQL ya sea como cadena o como un objeto.
* **Cerrar conexión**. Cuando se ha terminado de trabajar con la BD, es necesario cerrar explícitamente la conexión.

Cada función manejando una ruta usa este flujo de eventos.

## Referencias

* [npm/mysql](https://www.npmjs.com/package/mysql)