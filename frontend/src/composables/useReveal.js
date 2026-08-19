import { onMounted, onBeforeUnmount, ref } from 'vue'

// Directiva simple de "aparecer al hacer scroll" para dar sensación premium
// sin depender de una librería externa. Uso: <div v-reveal>
export const vReveal = {
  mounted(el) {
    el.classList.add('reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    el.__revealObserver = observer
  },
  unmounted(el) {
    el.__revealObserver?.disconnect()
  }
}
