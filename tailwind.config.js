/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            // Definición de colores
            colors: {
                primary: '#ED117F',
                secondary: '#F4C22E',
                accent: '#F1C135',
                dark: '#000000',
                light: '#FFFFFF',
            },
            // Configuración del contenedor
            container: {
                center: true,
                padding: '1rem',
            },
            // Fuente personalizada (puedes usar "font-poppins" en tus clases si así lo prefieres)
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            // Definición de animaciones para el carrusel infinito:
            // Se utiliza "translateX(-50%)" para desplazar el contenedor duplicado (dos copias de los ítems)
            animation: {
                // Para pantallas estándar: 25 segundos
                'infinite-scroll-half': 'infinite-scroll-half 25s linear infinite',
                // Para dispositivos móviles: 35 segundos (más lenta para mayor fluidez)
                'infinite-scroll-half-mobile': 'infinite-scroll-half-mobile 35s linear infinite',
                // Para pantallas de alta resolución (por ejemplo, 2K): 20 segundos (más rápida)
                'infinite-scroll-highres': 'infinite-scroll-highres 20s linear infinite',
            },
            keyframes: {
                'infinite-scroll-half': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
                'infinite-scroll-half-mobile': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
                'infinite-scroll-highres': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
            },
        },
    },
    plugins: [],
};
