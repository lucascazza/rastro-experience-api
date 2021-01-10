// Dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// Settings
const port = process.env.PORT || 3000

const routes = require('./routes');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }))

// LLama a las rutas
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});

module.exports = app;