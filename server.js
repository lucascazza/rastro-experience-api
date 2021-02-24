// Dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Initializations
const app = express();
require('./database')

// Settings
const port = process.env.PORT || 3000

const routes = require('./routes');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }))

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// LLama a las rutas
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});



module.exports = app;