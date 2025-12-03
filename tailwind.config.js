/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9ddfe',
          300: '#7cc0fd',
          400: '#36a0fa',
          500: '#0b84eb',
          600: '#0067c9',
          700: '#0052a3',
          800: '#064686',
          900: '#0F213A', // Azul marino oscuro principal
        },
        sidebar: {
          DEFAULT: '#0F213A',
          light: '#1a2f4a',
          dark: '#0a1525',
        },
        content: {
          bg: '#ffffff',
          card: '#ffffff',
        },
        textColor: {
          primary: '#1f2937',
          secondary: '#6b7280',
          light: '#9ca3af',
          sidebar: '#d1d5db',
        },
        success: {
          light: '#86efac',
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        danger: {
          light: '#fca5a5',
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
