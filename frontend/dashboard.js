// 1. Verificar que el usuario tenga sesión iniciada
const token = localStorage.getItem('token');

if (!token) {
    alert('Acceso denegado. Debes iniciar sesión primero.');
    window.location.href = 'index.html';
}

// 2. Funcionalidad de Cerrar Sesión
document.getElementById('btnCerrarSesion').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
});

// 3. Cargar los vinos desde la API (Backend)
async function cargarVinos() {
    try {
        const respuesta = await fetch('http://localhost:3000/api/vinos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Enviamos la "llave"
            }
        });

        if (respuesta.ok) {
            const vinos = await respuesta.json();
            mostrarVinos(vinos);
        } else {
            console.error('Error al cargar los vinos');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
    }
}

// 4. Mostrar los vinos en la tabla HTML
function mostrarVinos(vinos) {
    const tbody = document.getElementById('tablaVinos');
    tbody.innerHTML = ''; // Limpiar la tabla

    vinos.forEach(vino => {
        // ALERTA VISUAL: Si el stock actual es menor o igual al mínimo, pinta la fila de rojo
        const alertaStock = vino.stock_actual <= vino.stock_minimo ? 'table-danger text-danger fw-bold' : '';

        const fila = document.createElement('tr');
        fila.className = alertaStock; 

        fila.innerHTML = `
            <td>${vino.id_vino}</td>
            <td><strong>${vino.nombre}</strong><br><small class="text-muted">${vino.cepa}</small></td>
            <td>${vino.bodega}</td>
            <td>$${vino.precio}</td>
            <td>${vino.stock_actual}</td>
            <td>${vino.stock_minimo}</td>
        `;
        tbody.appendChild(fila);
    });
}

// Ejecutar la función inmediatamente al abrir la página
cargarVinos();