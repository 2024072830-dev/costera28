const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect()
    .then(() => console.log('✅ Conexión exitosa a la base de datos costera28'))
    .catch(err => console.error('❌ Error de conexión a la base de datos', err.stack));

module.exports = pool;