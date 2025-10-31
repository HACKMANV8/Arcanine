import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['var(--font-inter)', 'sans-serif'] },
      colors: {
        primary: { DEFAULT: '#2E7D32', light: '#A5D6A7', dark: '#1B5E20', '50': '#E8F5E9' },
        secondary: { DEFAULT: '#6D4C41', light: '#A1887F', dark: '#3E2723' },
        accent: { DEFAULT: '#FF9800', light: '#FFB74D', dark: '#E65100' },
        neutral: {
          light: '#F5F5F5', DEFAULT: '#E0E0E0', dark: '#333333', darker: '#212121', muted: '#757575',
        },
      },
      borderRadius: { lg: '0.5rem', xl: '0.75rem', '2xl': '1rem' },
      boxShadow: { soft: '0 4px 12px rgba(0,0,0,0.05)', 'soft-lg': '0 8px 16px rgba(0,0,0,0.05)' },
      spacing: { '1.5': '0.375rem', '2.5': '0.625rem', '12': '3rem' },
      transitionDuration: { '200': '200ms' },
    },
  },
  plugins: [],
};
export default config;