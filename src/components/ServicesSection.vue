<script setup>
const services = [
  {
    title: 'Sistemas de gestión',
    description: 'CRMs, inventarios y ERPs a medida, con reportes y control de accesos por rol.'
  },
  {
    title: 'Facturación electrónica',
    description: 'Integración con SUNAT: boletas, facturas y notas conforme a normativa peruana.'
  },
  {
    title: 'Landing pages & CMS',
    description: 'Sitios rápidos y editables, pensados para conversión y fácil mantenimiento.'
  }
]
</script>

<template>
  <section id="servicios" class="max-w-6xl mx-auto px-6 py-20">
    <p class="eyebrow mb-4">02 · servicios</p>
    <h2 class="font-display text-3xl font-semibold mb-12">Lo que puedo construir para ti</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div v-for="service in services" :key="service.title" class="card rounded-2xl p-6">
        <h3 class="font-display font-semibold mb-2">{{ service.title }}</h3>
        <p class="text-sm text-ink-dim">{{ service.description }}</p>
      </div>
    </div>
  </section>
</template>
