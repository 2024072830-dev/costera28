const express = require('express');
const router = express.Router();
const vinosController = require('../controllers/vinosController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas estas rutas están protegidas por el middleware
router.get('/', authMiddleware, vinosController.obtenerVinos);
router.post('/', authMiddleware, vinosController.crearVino);
router.put('/:id', authMiddleware, vinosController.actualizarVino);
router.delete('/:id', authMiddleware, vinosController.eliminarVino);

module.exports = router;