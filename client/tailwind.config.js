/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to scan all files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        'mint-green': '#A9DFD8', 
        'custom-gray': 'rgba(23, 24, 33, 1)',
            },
    }, 
    animation: {
      'spin-slow': 'spin 3s linear infinite',
    },
  },
  plugins: [    require('tailwind-scrollbar'),
  ],
};
