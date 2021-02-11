"use strict";

const { validationResult } = require('express-validator');

module.exports = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        let errorsData = {};
        errors.array().forEach(error => errorsData[error.param] = error.msg);
        res.status(500).json( {
            message: 'Bad request',
            data: errorsData
        });
    };
};