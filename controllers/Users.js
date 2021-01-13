"use strict";

const User = require('../models/User');
const moment = require('moment');

const users = {}

users.getUser = async (req, res, next) => {
    res.status(200).json({
        username: 'Cameron',
        lastname: 'Tucu'
    })
}

users.getAllUsers = async (req, res, next) => {
    res.status(200).json({
        username: 'Cameron',
        lastname: 'Tucu'
    }, {
        username: 'Jonh',
        lastname: 'Salchi'
    })
}

users.register = async (req, res, next) => {
    try {
        let newUser = new User({
            name: req.body.name,
            userName: req.body.userName,
            password: req.body.password,
            step: 0,
            createdAt: moment().valueOf(),
            updatedAt: moment().valueOf()
        });
        newUser = await newUser.save();
        
        res.status(200).json({
            message: 'Usuario creado',
            data: newUser
        })
    } catch (err) {
        res.status(500).json({
            message:'Usuario no creado',
            data: err.toString()
        });
    }
}

users.update = async (req, res, next) => {
    console.log(`Usuario ${req.params.id} actualizado`)
    res.send(`Usuario ${req.params.id} actualizado`)
}

users.delete = async (req, res, next) => {
    console.log(`Usuario ${req.params.id} eliminado`)
    res.send(`Usuario ${req.params.id} eliminado`)
}

module.exports = users;