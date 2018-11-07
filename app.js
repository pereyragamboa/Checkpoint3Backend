const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./models/Usuarios.js');
require('./models/Aerolineas');

const keys = require('./config/keys');

mongoose.connect(keys.mongoNection, { useNewUrlParser: true }); // evita el DeprecationWarning

const app = express();

app.use(bodyParser.json());

const usuariosRoutes = require('./routes/usuariosRoutes');
usuariosRoutes(app);
const aerolineasRoutes = require('./routes/aerolineasRoutes');
aerolineasRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

