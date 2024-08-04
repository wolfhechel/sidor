import defaultColors from 'tailwindcss/colors';


const colors = {
  steelGray: {
    50: '#F1F5FD',
    100: '#DAE3FB',
    200: '#BECCF3',
    300: '#9AAEE5',
    400: '#7A91D1',
    500: '#5F77B9',
    600: '#516394',
    700: '#48516A',
    800: '#3A3D46',
    900: '#212832',
    DEFAULT: '#5F77B9'
  },
  orange: {
    50: '#FFF6F0',
    100: '#FFECE0',
    200: '#FFCEAD',
    300: '#FFAF7A',
    400: '#FF9047',
    500: '#FD7014',
    600: '#D35B0D',
    700: '#9A4813',
    800: '#673414',
    900: '#381F0F',
    DEFAULT: '#FD7014'
  }
}

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
        primary: colors.steelGray,
        accent: colors.orange,
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
          primary: colors.steelGray[500],
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

