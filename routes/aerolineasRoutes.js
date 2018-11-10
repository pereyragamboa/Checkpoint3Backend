const mongoose = require('mongoose');

const Aerolinea = mongoose.model('aerolineas');
const { flotaDuplicada } = require('../lib/aerolineasMiddleware');

module.exports = (app) => {

  // Obtiene todas las aerolíneas.
  app.get('/api/aerolineas', async(req, res) => {
    const aerolineas = await Aerolinea.find();
    res.send(aerolineas);
  });

  // Obtiene la aerolínea con el ID indicado.
  app.get('/api/aerolineas/:id', async(req, res) => {
    const aerolineas = await Aerolinea.findOne({ _id: req.params.id });
    res.send(aerolineas);
  });

  // Agrega una aerolínea.
  app.post(
    '/api/aerolineas',
    flotaDuplicada,
    async (req, res) => {
      console.log("\t=> Preparando aerolínea...");
      const { nombre, nacionalidad, flota } = req.body;
      try {
        const nuevaAerolinea = new Aerolinea({
          nombre, nacionalidad, flota
        });
        await nuevaAerolinea.save();
        res.send("Aerolínea guardada.")
      } catch (err) {
        res.status(500).send(`Error de ejecución: ${err.message}`);
      }
    }
  );

  // Modifica una aerolínea.
  app.post('/api/aerolineas/:id',
    flotaDuplicada,
    async (req, res) => {
    const { nombre, nacionalidad, flota } = req.body;

    const respuesta = await Aerolinea.findOneAndUpdate(
      { _id: req.params.id },
      { nombre, nacionalidad, flota },
      { new: true }
    ).exec();

    res.send(respuesta);
  });

  // Elimina una aerolínea.
  app.delete('/api/aerolineas/:id', async (req, res) =>
    res.send(await Aerolinea.deleteOne({ _id: req.params.id }))
  );
};