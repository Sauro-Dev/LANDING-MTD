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
                'infinite-scroll-half': 'infinite-scroll-half 15s linear infinite',
                'infinite-scroll-half-mobile': 'infinite-scroll-half-mobile 20s linear infinite',
                'infinite-scroll-highres': 'infinite-scroll-highres 10s linear infinite',
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
