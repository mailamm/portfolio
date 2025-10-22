import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: '#5A3B3A',
          brownDark: '#4A2F2E',
          peach: '#FBE6E0',
          peachMid: '#F4D5CD',
          border: '#E9C9C2',
        },
      },
      boxShadow: {
        soft: '0 1px 4px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
} satisfies Config