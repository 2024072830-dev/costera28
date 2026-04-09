const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./src/db'); 

// Importar rutas
const authRoutes = require('./src/routes/authRoutes');
const vinosRoutes = require('./src/routes/vinosRoutes'); // <-- NUEVO

const app = express();

app.use(cors());
app.use(express.json()); 

// Usar las rutas
app.use('/api/auth', authRoutes);
app.use('/api/vinos', vinosRoutes); // <-- NUEVO

app.get('/', (req, res) => {
    res.send('🍷 Bienvenido a la API del Inventario de Vinos - La Costera 28');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});