import { ref, watchEffect } from 'vue'

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null
const theme = ref(stored === 'light' ? 'light' : 'dark')

function applyTheme() {
  const root = document.documentElement
  if (theme.value === 'light') {
    root.classList.add('light')
  } else {
    root.classList.remove('light')
  }
  localStorage.setItem('theme', theme.value)
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

export function useTheme() {
  watchEffect(applyTheme)
  return { theme, toggleTheme }
}
