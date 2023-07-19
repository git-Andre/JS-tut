const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */

module.exports = {
    mode: 'jit',
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {},
        fontFamily: {
            sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        },
    },
    plugins: [],
}