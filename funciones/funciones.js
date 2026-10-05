// =========================================================
// funciones.js
// Funciones JavaScript para la web https://aricobirt.github.io/
// =========================================================

/**
 * Función 1: Cuenta atrás para el Gran Premio de España 2027
 * Busca un elemento con id "cuenta-atras" y muestra el tiempo
 * restante hasta el 12 de septiembre de 2027 a las 15:00 (hora local).
 */
function iniciarCuentaAtras() {
    const contenedor = document.getElementById('cuenta-atras');
    if (!contenedor) return; // Si no existe el elemento, no hace nada

    // Inyectar estilos si no existen
    if (!document.getElementById('cuenta-atras-estilos')) {
        const estilo = document.createElement('style');
        estilo.id = 'cuenta-atras-estilos';
        estilo.textContent = `
            .cuenta-atras {
                background: #1a1a1a;
                color: #fff;
                padding: 1rem;
                border-radius: 10px;
                text-align: center;
                margin-top: 1rem;
                border-left: 6px solid #d40000;
            }
            .cuenta-atras-contenido p {
                margin-bottom: 0.5rem;
                font-weight: bold;
                color: #ff4d4d;
            }
            .cuenta-atras-bloques {
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            .cuenta-atras-bloques .bloque {
                background: #333;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                min-width: 70px;
            }
            .cuenta-atras-bloques .numero {
                display: block;
                font-size: 1.8rem;
                font-weight: bold;
                color: #fff;
            }
            .cuenta-atras-bloques .etiqueta {
                font-size: 0.8rem;
                color: #ccc;
                text-transform: uppercase;
            }
        `;
        document.head.appendChild(estilo);
    }

    // Fecha objetivo: 12 de septiembre de 2027, 15:00:00
    const fechaObjetivo = new Date('2027-09-12T15:00:00').getTime();
    let intervalo;

    function actualizar() {
        const ahora = new Date().getTime();
        const diferencia = fechaObjetivo - ahora;

        if (diferencia < 0) {
            contenedor.innerHTML = '<strong>¡El Gran Premio ya ha comenzado!</strong>';
            clearInterval(intervalo);
            return;
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        contenedor.innerHTML = `
            <div class="cuenta-atras-contenido">
                <p>Faltan para el GP de España 2027:</p>
                <div class="cuenta-atras-bloques">
                    <div class="bloque"><span class="numero">${dias}</span><span class="etiqueta">días</span></div>
                    <div class="bloque"><span class="numero">${horas}</span><span class="etiqueta">horas</span></div>
                    <div class="bloque"><span class="numero">${minutos}</span><span class="etiqueta">min</span></div>
                    <div class="bloque"><span class="numero">${segundos}</span><span class="etiqueta">seg</span></div>
                </div>
            </div>
        `;
    }

    actualizar();
    intervalo = setInterval(actualizar, 1000);
}

/**
 * Función 2: Botón "Volver arriba"
 * Crea un botón flotante que aparece al hacer scroll hacia abajo
 * y lleva suavemente al principio de la página.
 */
function iniciarBotonVolverArriba() {
    // Crear el botón
    const boton = document.createElement('button');
    boton.id = 'btn-volver-arriba';
    boton.innerHTML = '↑';
    boton.title = 'Volver arriba';
    boton.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(boton);

    // Estilos (inyectados para no modificar estilos.css)
    boton.style.position = 'fixed';
    boton.style.bottom = '2rem';
    boton.style.right = '2rem';
    boton.style.width = '50px';
    boton.style.height = '50px';
    boton.style.borderRadius = '50%';
    boton.style.backgroundColor = '#d40000';
    boton.style.color = '#fff';
    boton.style.border = 'none';
    boton.style.fontSize = '1.8rem';
    boton.style.cursor = 'pointer';
    boton.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
    boton.style.display = 'none';
    boton.style.zIndex = '1000';
    boton.style.transition = 'opacity 0.3s, transform 0.2s';

    // Mostrar/ocultar según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            boton.style.display = 'block';
        } else {
            boton.style.display = 'none';
        }
    });

    // Acción al hacer clic
    boton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Función 3: Validación personalizada del formulario de contacto
 * - Añade un contador de caracteres al textarea del mensaje.
 * - Valida que el mensaje tenga al menos 10 caracteres.
 * - Valida el formato del teléfono si se ha introducido.
 * - Muestra mensajes de error personalizados.
 */
function iniciarValidacionContacto() {
    const formulario = document.querySelector('.formulario');
    if (!formulario) return; // No estamos en contacto.html

    const textarea = document.getElementById('mensaje');
    const telefono = document.getElementById('telefono');

    // 1. Contador de caracteres para el mensaje
    if (textarea) {
        const contador = document.createElement('span');
        contador.id = 'contador-mensaje';
        contador.style.fontSize = '0.85rem';
        contador.style.color = '#555';
        contador.style.marginLeft = '0.5rem';
        textarea.parentNode.appendChild(contador);

        function actualizarContador() {
            const longitud = textarea.value.length;
            contador.textContent = `${longitud} / 500 caracteres`;
            if (longitud > 500) {
                contador.style.color = 'red';
            } else {
                contador.style.color = '#555';
            }
        }
        textarea.addEventListener('input', actualizarContador);
        actualizarContador();
    }

    // 2. Validación al enviar
    formulario.addEventListener('submit', function(evento) {
        let valido = true;
        let mensajesError = [];

        // Validar mensaje (mínimo 10 caracteres)
        if (textarea && textarea.value.trim().length < 10) {
            valido = false;
            mensajesError.push('El mensaje debe tener al menos 10 caracteres.');
        }

        // Validar teléfono (si no está vacío, comprobar patrón)
        if (telefono && telefono.value.trim() !== '') {
            const patronTelefono = /^[+0-9 ]{7,15}$/;
            if (!patronTelefono.test(telefono.value.trim())) {
                valido = false;
                mensajesError.push('El teléfono solo puede contener números, espacios y el signo +, entre 7 y 15 caracteres.');
            }
        }

        if (!valido) {
            evento.preventDefault();
            alert('Por favor, corrige los siguientes errores:\n- ' + mensajesError.join('\n- '));
        }
    });
}

// =========================================================
// Inicialización: se ejecuta cuando el DOM está listo
// =========================================================
document.addEventListener('DOMContentLoaded', function() {
    iniciarCuentaAtras();
    iniciarBotonVolverArriba();
    iniciarValidacionContacto();
});
