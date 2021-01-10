"use strict";

const users = {}

users.getUser = async (req, res, next) => {
    res.status(200).json({
        username: 'Cameron',
        lastname: 'Tucu'
    })
}

users.create = async (req, res, next) => {
    console.log(req.body)
    console.log(req.params)
    res.send('Post user')
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