<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectImage from '../components/ProjectImage.vue'
import ProjectModal from '../components/ProjectModal.vue'
import { projects } from '../data/projects'

const route = useRoute()
const router = useRouter()

// Proyecto abierto mediante la URL:
// /portafolio/:slug
const selectedProject = computed(() =>
  route.params.slug
    ? projects.find((p) => p.slug === route.params.slug)
    : null
)

function openProject(project) {
  router.push(`/portafolio/${project.slug}`)
}

function closeProject() {
  router.push('/portafolio')
}

function isDeveloping(project) {
  return project.status === 'developing'
}

function isPublished(project) {
  return project.status === 'published'
}
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 pt-32 pb-20">

    <!-- HEADER -->
    <p class="eyebrow mb-4">portafolio</p>

    <h1 class="font-display text-3xl sm:text-4xl font-semibold mb-4">
      Todos los proyectos
    </h1>

    <p class="text-ink-dim max-w-xl mb-12">
      Sistemas de gestión, facturación electrónica y plataformas a medida,
      construidos de punta a punta con Vue y Laravel.
    </p>

    <!-- PROJECTS -->
    <div class="grid sm:grid-cols-2 gap-6">

      <button
        v-for="project in projects"
        :key="project.slug"
        type="button"
        class="card rounded-2xl p-5 text-left focus:outline-none
               focus-visible:ring-2 focus-visible:ring-magenta
               transition-all duration-300 hover:-translate-y-1"
        @click="openProject(project)"
      >

        <!-- IMAGE -->
        <div class="relative">

          <ProjectImage
            :src="project.image"
            :title="project.title"
            :gradient="project.gradient"
            :icon="project.icon"
          />

          <!-- STATUS -->
          <div class="absolute top-3 right-3">

            <!-- EN DESARROLLO -->
            <span
              v-if="isDeveloping(project)"
              class="inline-flex items-center gap-1.5
                     px-3 py-1.5 rounded-full
                     bg-black/75 backdrop-blur-md
                     border border-yellow-400/30
                     text-yellow-300
                     font-mono text-[10px] uppercase tracking-wider"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse"></span>
              {{ project.statusLabel }}
            </span>

            <!-- PUBLICADO -->
            <span
              v-else-if="isPublished(project)"
              class="inline-flex items-center gap-1.5
                     px-3 py-1.5 rounded-full
                     bg-black/75 backdrop-blur-md
                     border border-emerald-400/30
                     text-emerald-300
                     font-mono text-[10px] uppercase tracking-wider"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
              {{ project.statusLabel }}
            </span>

          </div>
        </div>

        <!-- DEMO PATH -->
        <span
          v-if="isPublished(project)"
          class="font-mono text-xs text-cyan block mt-4"
        >
          {{ project.demoPath }}
        </span>

        <span
          v-else
          class="font-mono text-xs text-yellow-300/70 block mt-4"
        >
          developing.alessdigital.pe/{{ project.slug }}
        </span>

        <!-- TITLE -->
        <h3
          class="font-display text-xl font-semibold mt-2 mb-2"
        >
          {{ project.title }}
        </h3>

        <!-- DESCRIPTION -->
        <p class="text-sm text-ink-dim">
          {{ project.description }}
        </p>

        <!-- TECHNOLOGIES -->
        <div class="flex flex-wrap gap-2 mt-4">

          <span
            v-for="tech in project.tech"
            :key="tech"
            class="font-mono text-[11px]
                   px-2.5 py-1 rounded-full
                   border border-border-subtle/15
                   text-ink-dim"
          >
            {{ tech }}
          </span>

        </div>

        <!-- ACTION -->
        <div class="mt-5 pt-4 border-t border-border-subtle/10">

          <span
            v-if="isDeveloping(project)"
            class="font-mono text-xs text-yellow-300"
          >
            🚧 Proyecto en desarrollo
          </span>

          <span
            v-else-if="isPublished(project)"
            class="font-mono text-xs text-cyan"
          >
            Ver proyecto →
          </span>

        </div>

      </button>
    </div>

    <!-- MODAL -->
    <ProjectModal
      v-if="selectedProject"
      :project="selectedProject"
      @close="closeProject"
    />

  </section>
</template>