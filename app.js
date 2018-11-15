const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(bodyParser.json());

const usuariosRoutes = require('./routes/usuariosRoutes');
usuariosRoutes(app);
const aerolineasRoutes = require('./routes/aerolineasRoutes');
aerolineasRoutes(app);
const flotaRoutes = require('./routes/flotaRoutes');
flotaRoutes(app);
const vuelosRoutes = require('./routes/vuelosRoutes');
vuelosRoutes(app);
const generalRoutes = require('./routes/generalRoutes');
generalRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

