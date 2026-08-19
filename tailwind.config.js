/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        'bg-deep': 'rgb(var(--color-bg-deep) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        'ink-dim': 'rgb(var(--color-ink-dim) / <alpha-value>)',
        'border-subtle': 'rgb(var(--color-border) / <alpha-value>)',
        magenta: '#e91e8c',
        blue: '#3b7dff',
        cyan: '#4fd6ff',
        gold: '#f5d8a8'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
}
