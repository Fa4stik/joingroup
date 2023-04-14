/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'interReg': ['Inter-Regular', 'system-ui', 'sans-serif'],
        'interBold': ['Inter-Bold', 'system-ui', 'sans-serif'],
        'gentiumReg': ['GentiumBookPlus-Regular', 'system-ui', 'sans-serif'],
      },

      boxShadow: {
        header: '2px 5px 20px rgba(0, 0, 0, 0.15), -2px -5px 20px rgba(0, 0, 0, 0.15)',
        button: '-4px -4px 15px rgba(0, 0, 0, 0.07), 4px 4px 15px rgba(0, 0, 0, 0.07)',
      },
    },
  },
  plugins: [],
}