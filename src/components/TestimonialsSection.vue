<script setup>
// Reemplaza este array con reseñas reales de clientes: nombre, cargo/empresa y cita.
const testimonials = []
</script>

<template>
  <section id="testimonios" class="max-w-6xl mx-auto px-6 py-20">
    <p class="eyebrow mb-4">06 · testimonios</p>
    <h2 class="font-display text-3xl font-semibold mb-10">Lo que dicen mis clientes</h2>

    <div v-if="testimonials.length === 0" class="card rounded-2xl p-8">
      <p class="text-sm text-ink-dim font-mono">— espacio reservado para reseñas de clientes —</p>
    </div>

    <div v-else class="grid md:grid-cols-2 gap-6">
      <div v-for="item in testimonials" :key="item.name" class="card rounded-2xl p-6">
        <p class="text-sm text-ink-dim italic mb-4">{{ item.quote }}</p>
        <p class="font-mono text-xs">{{ item.name }} — {{ item.role }}</p>
      </div>
    </div>
  </section>
</template>
