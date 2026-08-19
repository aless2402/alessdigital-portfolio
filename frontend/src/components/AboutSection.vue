<script setup>
const facts = [
  { label: 'Experiencia', value: '3 años' },
  { label: 'Enfoque', value: 'Full stack' },
  { label: 'Stack principal', value: 'Vue · Laravel · Django' },
  { label: 'Base', value: 'Perú' }
]
</script>

<template>
  <section id="sobre-mi" class="max-w-6xl mx-auto px-6 py-20 sm:py-28 grid md:grid-cols-2 gap-12 items-center">
    <div v-reveal>
      <p class="eyebrow mb-4">01 · sobre mí</p>
      <h2 class="font-display text-2xl sm:text-3xl font-semibold mb-5">Del código a la operación real de un negocio.</h2>
      <p class="text-ink-dim leading-relaxed">
        Soy desarrolladora full stack con enfoque orientado al detalle, especializada en
        software de gestión: cada sistema que construyo resuelve un problema operativo
        concreto, desde llevar el control de un inventario hasta emitir comprobantes
        electrónicos válidos ante SUNAT. Trabajo de punta a punta, del diseño de base de
        datos a la interfaz final.
      </p>
    </div>
    <div v-reveal class="card rounded-2xl p-6 sm:p-8">
      <ul class="space-y-4 font-mono text-sm">
        <li
          v-for="(fact, i) in facts"
          :key="fact.label"
          class="flex justify-between pb-3"
          :class="{ 'border-b border-border-subtle/10': i < facts.length - 1 }"
        >
          <span class="text-ink-dim">{{ fact.label }}</span>
          <span>{{ fact.value }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
