/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f5f3',
          100: '#e8e5df',
          200: '#d1cbc0',
          300: '#aea298',
          400: '#857a72',
          500: '#665c56',
          600: '#4d4540',
          700: '#3a332f',
          800: '#262220',
          900: '#171413',
          950: '#0c0a09'
        },
        clay: {
          50: '#fdf4ee',
          100: '#fbe4d4',
          200: '#f6c5a4',
          300: '#efa06d',
          400: '#e87a3c',
          500: '#dc5e22',
          600: '#c04718',
          700: '#9e3617',
          800: '#7f2e19',
          900: '#682818',
          950: '#38130a'
        },
        moss: {
          50: '#f3f6ee',
          100: '#e3ebd6',
          200: '#c9d8b1',
          300: '#a7bd84',
          400: '#88a460',
          500: '#6c8845',
          600: '#536b34',
          700: '#41522b',
          800: '#364226',
          900: '#2f3923',
          950: '#171f10'
        }
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")"
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(23,20,19,0.12)',
        'glass-dark': '0 8px 32px 0 rgba(0,0,0,0.45)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 28s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    }
  },
  plugins: []
}
