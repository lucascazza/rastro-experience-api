"use strict";

const express = require('express');
const routes = express.Router();
const users = require('../controllers/Users');
const checkAuth = require('../middleware/checkAuth');
const validate = require('../middleware/checkParameters');
const { check } = require('express-validator');

routes.get('/', checkAuth, users.getByUserName);

routes.post('/register', validate([
    check('name').isString(),
    check('userName').isString(),
    check('password').isString()
]), users.register);

routes.post('/login', validate([
    check('password').isString()
]), users.login);

routes.put('/:id', checkAuth, validate([
    check('id').isString()
]), users.updateStep);

module.exports = routes;