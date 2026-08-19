<script setup>
import NetworkBackground from './NetworkBackground.vue'
</script>

<template>
  <section id="inicio" class="relative min-h-screen flex items-center overflow-hidden pt-24">
    <NetworkBackground />
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-deep pointer-events-none"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-10 items-center">
      <div class="md:col-span-3">
        <p class="eyebrow mb-5">// desarrolladora full stack — Perú</p>
        <h1 class="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
          Construyo los sistemas<br />
          que <span class="gradient-text">conectan</span> tu<br />
          negocio.
        </h1>
        <p class="mt-6 text-ink-dim text-base sm:text-lg max-w-lg">
          Alessandra — 3 años diseñando CRMs, sistemas de inventario, facturación electrónica
          y plataformas a medida con Vue, Laravel y Django.
        </p>
        <div class="mt-9 flex flex-wrap gap-4">
          <router-link
            to="/portafolio"
            class="font-mono text-sm px-6 py-3 rounded-full bg-gradient-to-r from-magenta to-blue hover:opacity-90 transition-opacity"
          >Ver portafolio</router-link>
          <router-link
            to="/contacto"
            class="font-mono text-sm px-6 py-3 rounded-full border border-border-subtle/15 hover:border-border-subtle/40 transition-colors"
          >Contactar</router-link>
        </div>
      </div>
      <div class="md:col-span-2 hidden md:block"></div>
    </div>

    <router-link
      to="/sobre-mi"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-dim font-mono text-xs animate-bounce"
    >scroll ↓</router-link>
  </section>
</template>
