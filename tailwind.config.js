/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#FF8441', // '#f65e1c',
        border: '#f0e9e9',
        hover: 'rgb(243, 243, 248)',
        fg: '#313131',
        'fg-secondary': '#536471',
      },
      fontSize: {
        sm: ['0.8125rem', '1.375rem'],
        base: ['1rem', '1.375rem'],
        md: ['1.1875', '1.375rem'],
        lg: ['1.4375rem', '2.75rem'],
        xl: ['1.75rem', '2.75rem']
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}

