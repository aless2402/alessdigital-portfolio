<script setup>
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import { whatsappLink } from '../data/contact'

const links = [
  { to: '/sobre-mi', label: 'Sobre mí' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/portafolio', label: 'Portafolio' },
  { to: '/tecnologias', label: 'Tecnologías' },
  { to: '/testimonios', label: 'Testimonios' },
  { to: '/contacto', label: 'Contacto' }
]

const { theme, toggleTheme } = useTheme()
const mobileOpen = ref(false)

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <nav class="fixed top-0 w-full z-50 backdrop-blur-md bg-bg-deep/70 border-b border-border-subtle/10">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <router-link to="/" class="font-display font-semibold text-lg tracking-tight" @click="closeMobile">
        Aless<span class="gradient-text">Digital</span>
      </router-link>

      <div class="hidden md:flex items-center gap-8 text-sm text-ink-dim font-mono">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="hover:text-ink transition-colors"
          active-class="text-ink"
        >{{ link.label }}</router-link>
      </div>

      <div class="hidden md:flex items-center gap-3">
        <button
          type="button"
          @click="toggleTheme"
          class="w-9 h-9 grid place-items-center rounded-full border border-border-subtle/15 hover:border-border-subtle/40 transition-colors"
          :aria-label="theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'"
        >
          <span v-if="theme === 'dark'" class="text-sm">☀️</span>
          <span v-else class="text-sm">🌙</span>
        </button>
        <a
          :href="whatsappLink()"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-full border border-magenta/60 hover:bg-magenta/10 transition-colors"
        >
          <span>💬</span> Hablemos
        </a>
      </div>

      <div class="flex items-center gap-2 md:hidden">
        <button
          type="button"
          @click="toggleTheme"
          class="w-9 h-9 grid place-items-center rounded-full border border-border-subtle/15"
          :aria-label="theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'"
        >
          <span v-if="theme === 'dark'" class="text-sm">☀️</span>
          <span v-else class="text-sm">🌙</span>
        </button>
        <button
          type="button"
          @click="mobileOpen = !mobileOpen"
          class="w-9 h-9 grid place-items-center rounded-full border border-border-subtle/15"
          aria-label="Abrir menú"
        >
          <span class="text-lg leading-none">{{ mobileOpen ? '✕' : '☰' }}</span>
        </button>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="mobileOpen"
        class="md:hidden border-t border-border-subtle/10 bg-bg-deep/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 font-mono text-sm text-ink-dim"
      >
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          @click="closeMobile"
          class="hover:text-ink transition-colors"
          active-class="text-ink"
        >{{ link.label }}</router-link>
        <a
          :href="whatsappLink()"
          target="_blank"
          rel="noopener"
          @click="closeMobile"
          class="text-center px-4 py-2 rounded-full border border-magenta/60 hover:bg-magenta/10 transition-colors text-ink"
        >💬 Hablemos</a>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
