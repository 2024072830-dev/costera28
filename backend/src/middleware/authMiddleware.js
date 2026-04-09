const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Leer el token desde los headers de la petición
    const token = req.header('Authorization');

    // Si no hay token, no lo dejamos pasar
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token de seguridad.' });
    }

    try {
        // Quitamos la palabra "Bearer " si viene incluida
        const tokenLimpio = token.replace('Bearer ', '');
        
        // Verificamos si el token es válido
        const verificado = jwt.verify(tokenLimpio, process.env.JWT_SECRET);
        req.usuario = verificado; // Guardamos los datos del usuario en la petición
        next(); // Lo dejamos pasar a la ruta
    } catch (error) {
        res.status(400).json({ error: 'Token no válido o expirado.' });
    }
};