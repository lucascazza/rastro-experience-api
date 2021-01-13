"use strict";

const express = require('express');
const routes = express.Router();
const users = require('../controllers/Users');
const validate = require('../middleware/checkParameters');
const { check } = require('express-validator');


routes.get('/', users.getUser);

routes.get('/all', users.getAllUsers);

routes.post('/register', validate([
    check('name').isString(),
    check('userName').isString(),
    check('password').isString()
]), users.register);

routes.put('/:id', users.update);

routes.delete('/:id', users.delete);

module.exports = routes;