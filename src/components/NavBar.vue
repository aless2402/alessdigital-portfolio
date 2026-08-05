<script setup>
const links = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#portafolio', label: 'Portafolio' },
  { href: '#tecnologias', label: 'Tecnologías' },
  { href: '#contacto', label: 'Contacto' }
]
</script>

<template>
  <nav class="fixed top-0 z-50 w-full border-b backdrop-blur-md bg-bg-deep/70 border-white/5">
    <div class="flex items-center justify-between max-w-6xl px-6 py-4 mx-auto">
      <a href="#inicio" class="text-lg font-semibold tracking-tight font-display">
        Aless<span class="gradient-text">Digital</span>
      </a>
      <div class="hidden gap-8 font-mono text-sm md:flex text-ink-dim">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="transition-colors hover:text-white"
        >{{ link.label }}</a>
      </div>
      <a
  href="https://wa.me/51927967584?text=Hola%20AlessDigital,%20quiero%20información%20sobre%20sus%20servicios%20y%20me%20gustaría%20recibir%20más%20detalles."
  target="_blank"
  rel="noopener noreferrer"
  class="hidden px-4 py-2 font-mono text-sm transition-colors border rounded-full md:inline-block border-magenta/60 hover:bg-magenta/10"
>
  Hablemos
</a>
    </div>
  </nav>
</template>
