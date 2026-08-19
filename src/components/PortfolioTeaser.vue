<script setup>
import ProjectImage from './ProjectImage.vue'
import { featuredProjects } from '../data/projects'
</script>

<template>
  <section id="portafolio" class="max-w-6xl mx-auto px-6 py-20">
    <div class="flex items-end justify-between flex-wrap gap-4 mb-12">
      <div>
        <p class="eyebrow mb-4" v-reveal>03 · portafolio</p>
        <h2 class="font-display text-2xl sm:text-3xl font-semibold" v-reveal>Proyectos destacados</h2>
      </div>
      <router-link
        to="/portafolio"
        v-reveal
        class="font-mono text-sm px-5 py-2.5 rounded-full border border-border-subtle/15 hover:border-border-subtle/40 transition-colors whitespace-nowrap"
      >Explorar todos los proyectos →</router-link>
    </div>

    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <router-link
        v-for="(project, i) in featuredProjects"
        :key="project.slug"
        :to="`/portafolio/${project.slug}`"
        v-reveal
        :style="{ transitionDelay: `${i * 60}ms` }"
        class="card rounded-2xl p-5 text-left block focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta"
      >
        <ProjectImage
          :src="project.image"
          :title="project.title"
          :gradient="project.gradient"
          :icon="project.icon"
        />
        <span class="font-mono text-xs text-cyan block mt-4">{{ project.demoPath }}</span>
        <h3 class="font-display text-lg font-semibold mt-2 mb-2">{{ project.title }}</h3>
        <p class="text-sm text-ink-dim">{{ project.description }}</p>
      </router-link>
    </div>
  </section>
</template>
