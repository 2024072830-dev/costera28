// Detectar si estamos en la página de login
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const correo = document.getElementById('correo').value;
        const password = document.getElementById('password').value;
        const mensajeError = document.getElementById('mensajeError');

        try {
            // Enviar datos al Backend (Ruta de login)
            const respuesta = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password })
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                // Si el login es exitoso, GUARDAMOS EL TOKEN en el navegador
                localStorage.setItem('token', datos.token);
                localStorage.setItem('usuario', JSON.stringify(datos.usuario));
                
                // Redirigimos al inventario
                window.location.href = 'dashboard.html';
            } else {
                // Si hay error, mostramos el mensaje
                mensajeError.textContent = datos.error || 'Error al iniciar sesión';
                mensajeError.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            mensajeError.textContent = 'Error al conectar con el servidor';
            mensajeError.style.display = 'block';
        }
    });
}