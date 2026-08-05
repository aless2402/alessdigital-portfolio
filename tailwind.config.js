/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        'bg-deep': '#0a0818',
        'bg-purple': '#1a0b2e',
        magenta: '#e91e8c',
        blue: '#3b7dff',
        cyan: '#4fd6ff',
        gold: '#f5d8a8',
        ink: '#f3f1fb',
        'ink-dim': '#a8a2c4'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    }
  },
  plugins: []
}
