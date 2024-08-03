import defaultColors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    darkMode: ['variant', [
      '@media (prefers-color-scheme: dark) { &:not(.light *) }',
      '&:is(.dark *)',
    ]],
    fontFamily: {
      sans: [
        'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 
        'Oxygen', 'Ubuntu', 'Cantarell', '"Open Sans"', '"Helvetica Neue"', 'sans-serif'
      ]
    },
    extend: {
      colors: {
        accent: '#f65e1c',
        light: {
          background: {
            DEFAULT: defaultColors.neutral[50],
            lightest: defaultColors.neutral[50],
            lighter: defaultColors.neutral[100],
            light: defaultColors.neutral[200],
          },
          foreground: {
            DEFAULT: defaultColors.neutral[800],
            secondary: defaultColors.neutral[500]
          },
          surface: defaultColors.neutral[400],
        }
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

