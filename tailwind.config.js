/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    safelist: [{ pattern: /^input-\w+$/ }, { pattern: /^select-\w+$/ }],
}
