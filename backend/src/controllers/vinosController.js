const pool = require('../db');

// 1. Obtener todos los vinos (READ)
exports.obtenerVinos = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM vinos ORDER BY id_vino DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los vinos' });
    }
};

// 2. Registrar un nuevo vino (CREATE - Alta)
exports.crearVino = async (req, res) => {
    const { nombre, cepa, anada, bodega, region, precio, stock_minimo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO vinos (nombre, cepa, anada, bodega, region, precio, stock_minimo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nombre, cepa, anada, bodega, region, precio, stock_minimo || 5]
        );
        res.status(201).json({ mensaje: 'Vino registrado con éxito', vino: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el vino' });
    }
};

// 3. Editar un vino (UPDATE - Editar datos)
exports.actualizarVino = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock_minimo } = req.body;
    try {
        const result = await pool.query(
            'UPDATE vinos SET nombre = $1, precio = $2, stock_minimo = $3 WHERE id_vino = $4 RETURNING *',
            [nombre, precio, stock_minimo, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Vino no encontrado' });
        res.json({ mensaje: 'Vino actualizado', vino: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el vino' });
    }
};

// 4. Eliminar un vino (DELETE - Baja)
exports.eliminarVino = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM vinos WHERE id_vino = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Vino no encontrado' });
        res.json({ mensaje: 'Vino eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el vino' });
    }
};