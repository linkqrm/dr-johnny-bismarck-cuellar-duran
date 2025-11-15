// ==========================================
// LANDING PAGE - GINECÓLOGO
// Archivo: script.js
// Descripción: Funcionalidad completa con modo oscuro
// ==========================================

// ==========================================
// EJECUTAR CUANDO EL DOM ESTÉ LISTO
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initScrollToTop();
    initFormValidation();
    initDarkMode();
    setCurrentYear();
    initHeaderScroll();
});

// ==========================================
// NAVEGACIÓN SUAVE (SMOOTH SCROLL)
// Al hacer clic en los enlaces del menú, scroll suave a la sección
// ==========================================
function initNavigation() {
    // Seleccionar todos los enlaces de navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el ID de la sección
            const targetId = this.getAttribute('href');
            
            // Si es solo '#', ir al inicio
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            // Buscar el elemento objetivo
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calcular la posición considerando el header fijo
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Hacer scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar el menú móvil si está abierto
                const navMenu = document.getElementById('navMenu');
                const navToggle = document.getElementById('navToggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
}

// ==========================================
// MENÚ HAMBURGUESA (MÓVIL)
// Abrir y cerrar el menú en dispositivos móviles
// ==========================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle del menú al hacer clic en el botón hamburguesa
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ==========================================
// HEADER CON EFECTO AL HACER SCROLL
// Añade clase 'scrolled' al header cuando se hace scroll
// ==========================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================
// BOTÓN SCROLL TO TOP
// Muestra botón para volver arriba cuando se hace scroll
// ==========================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (!scrollTopBtn) return;
    
    // Mostrar/ocultar botón según la posición del scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Al hacer clic, scroll suave al inicio
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// ANIMACIONES AL HACER SCROLL
// Los elementos con [data-animate] aparecen al entrar en viewport
// ==========================================
function initScrollAnimations() {
    // Seleccionar todos los elementos con atributo data-animate
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    // Configuración del Intersection Observer
    const observerOptions = {
        threshold: 0.15, // El elemento debe estar al menos 15% visible
        rootMargin: '0px 0px -50px 0px' // Margen de activación
    };
    
    // Callback cuando un elemento entra en viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir clase 'animated' cuando el elemento es visible
                entry.target.classList.add('animated');
                // Dejar de observar este elemento (animar solo una vez)
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Crear el observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observar cada elemento
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// VALIDACIÓN DEL FORMULARIO DE CONTACTO
// Valida los campos y muestra mensajes de error
// ==========================================
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!form) return;
    
    // Al enviar el formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Resetear errores previos
        clearErrors();
        
        // Validar cada campo
        let isValid = true;
        
        // Validar nombre
        const nombre = document.getElementById('nombre');
        if (nombre.value.trim() === '') {
            showError('nombre', 'Por favor ingresa tu nombre completo');
            isValid = false;
        } else if (nombre.value.trim().length < 3) {
            showError('nombre', 'El nombre debe tener al menos 3 caracteres');
            isValid = false;
        }
        
        // Validar teléfono
        const telefono = document.getElementById('telefono');
        const phonePattern = /^[0-9]{7,15}$/;
        if (telefono.value.trim() === '') {
            showError('telefono', 'Por favor ingresa tu teléfono');
            isValid = false;
        } else if (!phonePattern.test(telefono.value.replace(/\s/g, ''))) {
            showError('telefono', 'Ingresa un teléfono válido (solo números)');
            isValid = false;
        }
        
        // Validar email
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError('email', 'Por favor ingresa tu email');
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            showError('email', 'Ingresa un email válido');
            isValid = false;
        }
        
        // Validar mensaje
        const mensaje = document.getElementById('mensaje');
        if (mensaje.value.trim() === '') {
            showError('mensaje', 'Por favor describe el motivo de tu consulta');
            isValid = false;
        } else if (mensaje.value.trim().length < 10) {
            showError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        }
        
        // Si todo es válido, "enviar" el formulario
        if (isValid) {
            // Simular envío (en producción aquí iría AJAX o fetch a un servidor)
            submitForm(form, successMessage);
        } else {
            // Hacer scroll al primer error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Limpiar error al empezar a escribir
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorMsg = document.getElementById(this.id + 'Error');
                if (errorMsg) {
                    errorMsg.classList.remove('show');
                    errorMsg.textContent = '';
                }
            }
        });
    });
}

// ==========================================
// FUNCIÓN: MOSTRAR ERROR EN CAMPO
// Parámetros: fieldId (ID del campo), message (mensaje de error)
// ==========================================
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// ==========================================
// FUNCIÓN: LIMPIAR TODOS LOS ERRORES
// ==========================================
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorInputs = document.querySelectorAll('.error');
    
    errorMessages.forEach(msg => {
        msg.classList.remove('show');
        msg.textContent = '';
    });
    
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

// ==========================================
// FUNCIÓN: ENVIAR FORMULARIO
// Simula el envío y muestra mensaje de éxito
// ==========================================
function submitForm(form, successMessage) {
    // Ocultar el formulario
    form.style.display = 'none';
    
    // Mostrar mensaje de éxito
    successMessage.classList.add('show');
    
    // Hacer scroll al mensaje
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Resetear el formulario después de 5 segundos
    setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        successMessage.classList.remove('show');
    }, 5000);
    
    // En producción, aquí se enviaría la data al servidor:
    /*
    const formData = new FormData(form);
    
    fetch('tu-endpoint-aqui', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Manejar respuesta exitosa
        console.log('Formulario enviado:', data);
    })
    .catch(error => {
        // Manejar error
        console.error('Error al enviar:', error);
    });
    */
}

// ==========================================
// MODO OSCURO (DARK MODE)
// Toggle entre modo claro y oscuro con persistencia
// ==========================================
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Verificar si hay preferencia guardada en localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema guardado o usar preferencia del sistema
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        // Verificar preferencia del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // Toggle del tema al hacer clic
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Cambiar icono
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Solo aplicar si no hay preferencia manual guardada
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.add('dark-mode');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                body.classList.remove('dark-mode');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });
}

// ==========================================
// AÑO DINÁMICO EN FOOTER
// Actualiza automáticamente el año del copyright
// ==========================================
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// ==========================================
// FUNCIÓN ADICIONAL: PRELOAD DE IMÁGENES
// Opcional - para mejorar la experiencia de carga
// ==========================================
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// FUNCIÓN DE DEBUG (OPCIONAL)
// Útil para desarrollo - eliminar en producción
// ==========================================
function debugInfo() {
    console.log('🏥 Landing Page Ginecólogo - Cargada');
    console.log('📱 Ancho de ventana:', window.innerWidth);
    console.log('🎨 Tema actual:', document.body.classList.contains('dark-mode') ? 'Oscuro' : 'Claro');
}

// Llamar función de debug (comentar en producción)
// debugInfo();

// ==========================================
// MANEJO DE ERRORES GLOBAL
// Captura errores inesperados
// ==========================================
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.message);
    // Aquí podrías enviar errores a un servicio de tracking
});

// ==========================================
// PERFORMANCE MONITORING (OPCIONAL)
// Medir el tiempo de carga de la página
// ==========================================
window.addEventListener('load', function() {
    if ('performance' in window) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log('⚡ Tiempo de carga:', loadTime + 'ms');
    }
});

// ==========================================
// DETECCIÓN DE DISPOSITIVO MÓVIL (OPCIONAL)
// Útil para funcionalidades específicas de móvil
// ==========================================
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ==========================================
// PREVENIR ZOOM EN INPUTS EN iOS (OPCIONAL)
// Evita que iOS haga zoom al hacer focus en inputs
// ==========================================
if (isMobileDevice()) {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.style.fontSize !== '16px') {
                this.style.fontSize = '16px';
            }
        });
    });
}

// ==========================================
// EXPORTAR FUNCIONES (SI SE USA COMO MÓDULO)
// Descomentar si se necesita usar como módulo ES6
// ==========================================
// export {
//     initNavigation,
//     initMobileMenu,
//     initScrollAnimations,
//     initDarkMode,
//     initFormValidation
// };
