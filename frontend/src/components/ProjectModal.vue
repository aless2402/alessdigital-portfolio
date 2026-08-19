<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import ProjectImage from './ProjectImage.vue'

const props = defineProps({
  project: { type: Object, required: true }
})
const emit = defineEmits(['close'])

function onKeydown(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="emit('close')"></div>

      <div class="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-bg-deep border border-border-subtle/15 p-6 sm:p-8">
        <button
          type="button"
          @click="emit('close')"
          class="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full border border-border-subtle/15 hover:border-border-subtle/40 transition-colors"
          aria-label="Cerrar"
        >✕</button>

        <ProjectImage
          :src="project.image"
          :title="project.title"
          :gradient="project.gradient"
          :icon="project.icon"
        />

        <span class="font-mono text-xs text-cyan block mt-5">{{ project.demoPath }}</span>
        <h3 class="font-display text-2xl font-semibold mt-2 mb-3">{{ project.title }}</h3>
        <p class="text-sm text-ink-dim leading-relaxed mb-5">{{ project.description }}</p>

        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tech in project.tech"
            :key="tech"
            class="font-mono text-xs px-3 py-1 rounded-full border border-border-subtle/15 text-ink-dim"
          >{{ tech }}</span>
        </div>

        <a
          v-if="project.demoUrl"
          :href="project.demoUrl"
          target="_blank"
          rel="noopener"
          class="inline-block font-mono text-sm px-6 py-3 rounded-full bg-gradient-to-r from-magenta to-blue hover:opacity-90 transition-opacity"
        >Ver demo →</a>
      </div>
    </div>
  </Teleport>
</template>
