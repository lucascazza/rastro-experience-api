const jwt = require('jsonwebtoken');
const config = require('../config/default');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(!token){
            return res.status(401).send({
                message: ('No token error')
            });
        }
        token = token.replace('Bearer ', '');
        req.user = jwt.verify(token, config.JWT_KEY);
        // Chequeo si el metodo no es GET
        // Chequeo si existe el permiso en el token y si el mismo es solo de lectura
        if(req.method != 'GET' && req.user.shareProject && req.user.shareProject.permission == 'r') {
            return res.status(403).json({
                message: ('No permission'),
                data: ('No permission')
            });
        } else {
            next();
        }
    } catch(error) {
        return res.status(401).json({
            message: ('Authentication error'),
            data: error.toString()
        });
    }
};