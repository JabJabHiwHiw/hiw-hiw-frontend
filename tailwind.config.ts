import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)', ...fontFamily.sans],
      },
      screens: {
        sm: '376px',
        md: '782px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      colors: {
        high: '#122f6e',
        medium: '#64748b',
        subtle: '#F8FAFC',
        placeholder: '#94a3b8',
        invert: '#ffffff',
        disable: '#cbd5e1',
        bgColor: '#ffffff',
        error: {
          default: '#F86C6C',
          hover: '#E14C4C',
        },
        success: '#52D382',
        pending: '#FFC164',
        toggle: '#FF80AA',
        primary: {
          50: '#fffdea',
          100: '#fffcdf',
          200: '#fff9bd',
          300: '#ffed29',
          400: '#e6d525',
          500: '#ccbe21',
          600: '#bfb21f',
          700: '#998e19',
          800: '#736b12',
          900: '#59530e',
        },
        neutral: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        tag: {
          green: '#56C683',
          blue: '#6189D5',
          yellow: '#FFB35B',
          red: '#F84B4B',
          pink: '#F488A9',
        },
        status: {
          error: {
            default: '#F86C6C',
            hover: '#E14C4C',
          },
          pending: '#FFC164',
          success: '#52D382',
        },
      },

      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '36px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
