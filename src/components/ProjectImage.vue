<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  title: { type: String, required: true },
  gradient: { type: String, default: 'from-magenta to-blue' },
  icon: { type: String, default: '◆' }
})

// Si la captura real todavía no existe en /public/images/projects,
// se muestra un placeholder degradado en vez de un ícono roto.
const failed = ref(false)
</script>

<template>
  <div class="relative w-full aspect-video rounded-xl overflow-hidden">
    <img
      v-if="src && !failed"
      :src="src"
      :alt="`Captura del proyecto ${title}`"
      class="w-full h-full object-cover"
      loading="lazy"
      @error="failed = true"
    />
    <div
      v-else
      class="w-full h-full grid place-items-center bg-gradient-to-br"
      :class="gradient"
    >
      <span class="text-4xl opacity-90">{{ icon }}</span>
    </div>
  </div>
</template>
