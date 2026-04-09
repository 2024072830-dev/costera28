const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar usuario: POST /api/auth/registro
router.post('/registro', authController.registrar);

// Ruta para login: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;