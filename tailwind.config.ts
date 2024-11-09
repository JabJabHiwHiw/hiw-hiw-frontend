import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import tailwindcssAnimate from 'tailwindcss-animate'
import { withUt } from "uploadthing/tw";

const config: Config = withUt({
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
          '50': '#fffdea',
          '100': '#fffcdf',
          '200': '#fff9bd',
          '300': '#ffed29',
          '400': '#e6d525',
          '500': '#ccbe21',
          '600': '#bfb21f',
          '700': '#998e19',
          '800': '#736b12',
          '900': '#59530e',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        neutral: {
          '0': '#ffffff',
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
          '950': '#020617',
        },
        gray: {
          '100': '#AFAFAF',
          '200': '#9F9F9F',
          '300': '#8B8B8B',
          '400': '#4D4D4D',
          '500': '#414141',
          '600': '#383838',
          '700': '#1B1B1B',
          '800': '#131313',
          '900': '#080808',
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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '36px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
});

export default config
