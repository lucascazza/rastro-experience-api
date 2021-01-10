"use strict";

const express = require('express');
const routes = express.Router();
const users = require('../controllers/Users');


routes.get('/', users.getUser);

routes.post('/:id', users.create);

routes.put('/:id', users.update);

routes.delete('/:id', users.delete);

module.exports = routes;