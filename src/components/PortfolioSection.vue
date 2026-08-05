<script setup>
const projects = [
  {
    slug: 'crm',
    title: 'Freelancer CRM',
    description: 'Gestión de clientes, propuestas y pagos para profesionales independientes.'
  },
  {
    slug: 'inventario',
    title: 'Sistema de Inventario',
    description: 'Control de stock, alertas de quiebre y reportes por almacén.'
  },
  {
    slug: 'facturacion',
    title: 'Facturación Electrónica',
    description: 'Emisión de comprobantes válidos ante SUNAT, integrado a ventas.'
  },
  {
    slug: 'carnet-sanidad',
    title: 'Carnet de Sanidad',
    description: 'Registro y verificación digital de carnets sanitarios municipales.'
  },
  {
    slug: 'filmografia',
    title: 'Filmografía CMS',
    description: 'Catálogo administrable de producciones audiovisuales.'
  },
  {
    slug: 'landing',
    title: 'Landing Pages',
    description: 'Páginas de aterrizaje rápidas, editables y orientadas a conversión.'
  }
]
</script>

<template>
  <section id="portafolio" class="max-w-6xl mx-auto px-6 py-20">
    <p class="eyebrow mb-4">03 · portafolio</p>
    <h2 class="font-display text-3xl font-semibold mb-12">Proyectos</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div v-for="project in projects" :key="project.slug" class="card rounded-2xl p-6">
        <span class="font-mono text-xs text-cyan">demo.alessdigital.pe/{{ project.slug }}</span>
        <h3 class="font-display text-xl font-semibold mt-2 mb-2">{{ project.title }}</h3>
        <p class="text-sm text-ink-dim">{{ project.description }}</p>
      </div>
    </div>
  </section>
</template>
