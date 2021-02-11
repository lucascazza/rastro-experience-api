"use strict";

const User = require('../models/User');
const config = require('../config/default');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = {}

users.getByUserName = async (req, res, next) => {
    try {    
        const user = await User.findOne({ userName: req.user.userName }, {_id: 1, name: 1, userName: 1, step: 1})
            .exec();

        if(user) {
            const token = jwt.sign({ ...req.user }, config.JWT_KEY);
            return res.status(200).json({
                data: formatUserData(user),
                token
            });
        }

        res.status(404).json({
            message: ('User %s not found', req.user.userName)
        });
    } catch (err) {
        next(err);
    }
}

users.register = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        let newUser = new User({
            name: req.body.name,
            userName: req.body.userName,
            password: hash,
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
        console.log(err)
        res.status(500).json({
            message:'Usuario no creado',
            data: err.toString()
        });
    }
}

users.login = async (req, res, next) => {
    try {
        console.log(req.body.userName)
        const user = await User.findOne({ userName: req.body.userName }).exec();

        if (user.length === 0) {
            return res.status(404).json({
                message: ('Invalid user')
            });
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const token = jwt.sign({
                    userName: user.userName,
                    id: user._id
                },
                config.JWT_KEY, {
                    expiresIn: '30d'
                }
            );
            return res.status(200).json({
                token: token
            });
        }

        res.status(404).json({
            message: ('Incorrect password')
        });
    } catch (err) {
        res.status(404).json({
            message: ('Incorrect password'),
            data: err.toString()
        });
    }
}

users.update = async (req, res) => {
    try {
        const user = await User.updateOne({_id: req.params.id }, { $PUT: { 
            step: req.body.step,
            updatedAt: moment().valueOf()
        }});
        res.status(200).json({
            message: ('User updated'),
            data: formatUserData(user)
        });
    } catch (err) {
        res.status(500).json({
            message: ('User not updated'),
            data: err.toString()
        });
    }
}

function formatUserData(user) {
    delete user.password;
    return user;
}

module.exports = users;