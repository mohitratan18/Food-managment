/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderColor: {
        'border': 'currentcolor', // or a specific color like '#000' or 'theme("colors.gray.500")'
      },
      backgroundColor: {
        'background': 'var(--background)',
      },
      textColor: { // Or foregroundColor, if you prefer and use that consistently
        'foreground': 'var(--foreground)',
      },
      borderColor: {
        'border': 'var(--border)', // Use your --border variable here
      },
    },
  },
  plugins: [],
};
