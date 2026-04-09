const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./src/db'); 

// Importar rutas
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 

// Usar las rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('🍷 Bienvenido a la API del Inventario de Vinos - La Costera 28');
});

// Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});