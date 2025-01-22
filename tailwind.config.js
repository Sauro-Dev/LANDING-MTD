/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#646cff',
                    hover: '#535bf2',
                },
            },
            container: {
                center: true,
                padding: '1rem',
            },
        },
    },
    plugins: [],
}