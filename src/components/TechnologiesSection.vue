<script setup>
const groups = [
  { label: 'Frontend', items: ['Vue 3', 'Vite', 'JavaScript', 'Node.js', 'HTML', 'CSS', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Laravel', 'Python', 'Django', 'Flask', 'PHP', 'CodeIgniter'] },
  { label: 'Bases de datos', items: ['MySQL', 'PostgreSQL', 'SQL Server', 'SQLite'] },
  { label: 'Control de versiones & despliegue', items: ['Git', 'GitHub', 'Vercel'] }
]
</script>

<template>
  <section id="tecnologias" class="max-w-6xl mx-auto px-6 py-20">
    <p class="eyebrow mb-4">04 · tecnologías</p>
    <h2 class="font-display text-3xl font-semibold mb-10">Stack</h2>
    <div class="space-y-8">
      <div v-for="group in groups" :key="group.label">
        <p class="font-mono text-xs text-ink-dim mb-3">{{ group.label }}</p>
        <div class="flex flex-wrap gap-3 font-mono text-sm">
          <span
            v-for="tech in group.items"
            :key="tech"
            class="px-4 py-2 rounded-full border border-white/10"
          >{{ tech }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
