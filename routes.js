// Dependencies
const express = require('express');
const router = express.Router();
const Users = require('./routes/Users');

// Implement user apis
router.use('/user', Users);

// Health check route
router.get('/healthcheck', (req, res) => {
    res.status(200).json({ uptime: process.uptime() });
});

// Default route
router.get('*', (req, res) => {
    res.status(404).json({ message: res.__('Bad request') });
});

// Default error
router.use((err, req, res, next) => {
    res.status(500).json({
        message: res.__('Internal server error'),
        data: err.toString()
    });
});

module.exports = router;