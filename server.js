// Dependencies
const express = require('express');
const cors = require('cors');
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


if (process.env.NODE_ENV === 'prod') {
    // app.use(cors({
    //     origin: [ 'http://localhost', /\.agrodreams\.com$/, 'http://admin-aerodreams.s3-website.us-east-2.amazonaws.com' ],
    //     methods: 'PUT, POST, DELETE, GET',
    //     allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    //     maxAge: 86400
    // }))
} else {
    app.use(cors({
        origin: [ '*' ],
        methods: 'PUT, POST, DELETE, GET',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        maxAge: 86400
    }))
}


// LLama a las rutas
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});



module.exports = app;