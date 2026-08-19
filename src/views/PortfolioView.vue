<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectImage from '../components/ProjectImage.vue'
import ProjectModal from '../components/ProjectModal.vue'
import { projects } from '../data/projects'

const route = useRoute()
const router = useRouter()

// El proyecto abierto vive en la URL (/portafolio/:slug), así el link
// al detalle es compartible y funciona con el botón "atrás" del navegador.
const selectedProject = computed(() =>
  route.params.slug ? projects.find((p) => p.slug === route.params.slug) : null
)

function openProject(project) {
  router.push(`/portafolio/${project.slug}`)
}

function closeProject() {
  router.push('/portafolio')
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 pt-32 pb-20">
    <p class="eyebrow mb-4">portafolio</p>
    <h1 class="font-display text-3xl sm:text-4xl font-semibold mb-4">Todos los proyectos</h1>
    <p class="text-ink-dim max-w-xl mb-12">
      Sistemas de gestión, facturación electrónica y plataformas a medida, construidos
      de punta a punta con Vue y Laravel.
    </p>

    <div class="grid sm:grid-cols-2 gap-6">
      <button
        v-for="project in projects"
        :key="project.slug"
        type="button"
        class="card rounded-2xl p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta"
        @click="openProject(project)"
      >
        <ProjectImage
          :src="project.image"
          :title="project.title"
          :gradient="project.gradient"
          :icon="project.icon"
        />
        <span class="font-mono text-xs text-cyan block mt-4">{{ project.demoPath }}</span>
        <h3 class="font-display text-xl font-semibold mt-2 mb-2">{{ project.title }}</h3>
        <p class="text-sm text-ink-dim">{{ project.description }}</p>
        <div class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="tech in project.tech"
            :key="tech"
            class="font-mono text-[11px] px-2.5 py-1 rounded-full border border-border-subtle/15 text-ink-dim"
          >{{ tech }}</span>
        </div>
      </button>
    </div>

    <ProjectModal
      v-if="selectedProject"
      :project="selectedProject"
      @close="closeProject"
    />
  </section>
</template>
