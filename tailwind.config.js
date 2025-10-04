/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index-react.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'coral-red': '#ff6b6b',
        'mint-teal': '#4ecdc4',
        'sky-blue': '#45b7d1',
        'slate-gray': '#2c3e50',
        'golden-yellow': '#f9ca24',
      },
    },
  },
  plugins: [],
}
