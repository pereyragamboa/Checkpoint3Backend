const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./models/Usuarios.js');

mongoose.connect('mongodb://user:password1@ds249583.mlab.com:49583/checkpoint3');

const app = express();

app.use(bodyParser.json());

const usuariosRoutes = require('./routes/usuariosRoutes');
usuariosRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

