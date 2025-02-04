/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ED117F',
                secondary: '#F4C22E',
                accent: '#F1C135',
                dark: '#000000',
                light: '#FFFFFF',
            },
            container: {
                center: true,
                padding: '1rem',
            },
        },
    },
    plugins: [],
};
