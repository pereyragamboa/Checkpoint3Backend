const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const keys = require('./config/keys');
require('./models/Usuarios.js');
require('./models/Aerolineas');

mongoose.connect(keys.mongoConnection,
  { useNewUrlParser: true }); // evita el DeprecationWarning

const app = express();

app.use(bodyParser.json());

const usuariosRoutes = require('./routes/usuariosRoutes');
usuariosRoutes(app);
const aerolineasRoutes = require('./routes/aerolineasRoutes');
aerolineasRoutes(app);
const flotaRoutes = require('./routes/flotaRoutes');
flotaRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

