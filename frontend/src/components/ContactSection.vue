<script setup>
</script>

<template>
  <section id="contacto" class="max-w-6xl mx-auto px-6 py-20 sm:py-28 text-center">
    <p class="eyebrow mb-4" v-reveal>07 · contacto</p>
    <h2 class="font-display text-3xl sm:text-4xl font-semibold mb-6" v-reveal>¿Tienes un proyecto en mente?</h2>
    <p class="text-ink-dim mb-8 max-w-md mx-auto" v-reveal>
      Cuéntame tu idea. Yo me encargo de convertirla en una solución digital.
    </p>
    <router-link
      v-reveal
      to="/contacto"
      class="inline-block font-mono text-sm px-6 py-3 rounded-full bg-gradient-to-r from-magenta to-blue hover:opacity-90 transition-opacity"
    >Empezar mi proyecto →</router-link>
  </section>
</template>
