<script setup>
// Íconos vía Simple Icons (cdn.simpleicons.org/<slug>) — SVGs livianos con los
// colores de marca de cada tecnología, sin instalar un paquete de íconos.
const groups = [
  {
    label: 'Frontend',
    items: [
      { name: 'Vue 3', slug: 'vuedotjs' },
      { name: 'Vite', slug: 'vite' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'HTML', slug: 'html5' },
      { name: 'CSS', slug: 'css3' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' }
    ]
  },
  {
    label: 'Backend',
    items: [
      { name: 'Laravel', slug: 'laravel' },
      { name: 'Python', slug: 'python' },
      { name: 'Django', slug: 'django' },
      { name: 'Flask', slug: 'flask' },
      { name: 'PHP', slug: 'php' },
      { name: 'CodeIgniter', slug: 'codeigniter' }
    ]
  },
  {
    label: 'Bases de datos',
    items: [
      { name: 'MySQL', slug: 'mysql' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'SQL Server', slug: 'microsoftsqlserver' },
      { name: 'SQLite', slug: 'sqlite' }
    ]
  },
  {
    label: 'Control de versiones & despliegue',
    items: [
      { name: 'Git', slug: 'git' },
      { name: 'GitHub', slug: 'github' },
      { name: 'Vercel', slug: 'vercel' }
    ]
  }
]
</script>

<template>
  <section id="tecnologias" class="max-w-6xl mx-auto px-6 py-20">
    <p class="eyebrow mb-4" v-reveal>04 · tecnologías</p>
    <h2 class="font-display text-2xl sm:text-3xl font-semibold mb-10" v-reveal>Stack</h2>
    <div class="space-y-8">
      <div v-for="(group, i) in groups" :key="group.label" v-reveal :style="{ transitionDelay: `${i * 70}ms` }">
        <p class="font-mono text-xs text-ink-dim mb-3">{{ group.label }}</p>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="tech in group.items"
            :key="tech.name"
            class="flex items-center gap-2 font-mono text-sm px-4 py-2 rounded-full border border-border-subtle/15"
          >
            <img
              :src="`https://cdn.simpleicons.org/${tech.slug}`"
              :alt="tech.name"
              class="w-4 h-4"
              loading="lazy"
              width="16"
              height="16"
            />
            {{ tech.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
