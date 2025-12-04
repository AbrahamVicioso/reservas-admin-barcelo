/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sidebar
        'sidebar': '#0F213A',
        'sidebar-selected': '#1C2E4A',
        'sidebar-hover': '#243B5A',
        'text-sidebar': '#C9D1D9',
        'text-pale': '#FFFFFF',

        // Backgrounds
        'background': '#F4F6F8',
        'card': '#FFFFFF',
        'border-card': '#E3E6EA',

        // Typography
        'text-primary': '#1B1F24',
        'text-secondary': '#4B5563',
        'text-descriptive': '#6B7280',
        'text-weak': '#9CA3AF',

        // Accents
        'primary': {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#1A73E8',
          700: '#0B66C2',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        'success': '#22C55E',
        'success-light': '#A3E3B1',
        'success-dark': '#16A34A',
        'danger': '#EF4444',
        'danger-light': '#FCA5A5',
        'danger-dark': '#DC2626',
        'danger-notification': '#FF3B30',

        // Icons
        'icon-inactive': '#D1D5DB',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'soft-md': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'soft-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
