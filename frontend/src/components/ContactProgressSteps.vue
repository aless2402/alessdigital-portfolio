<script setup>
defineProps({
  current: { type: Number, required: true }
})

const steps = ['Información', 'Proyecto', 'Presupuesto', 'Enviar']
</script>

<template>
  <div class="flex items-center mb-10 font-mono text-xs">
    <template v-for="(label, i) in steps" :key="label">
      <div class="flex flex-col items-center gap-2 shrink-0">
        <span
          class="w-7 h-7 rounded-full grid place-items-center border transition-colors"
          :class="
            i + 1 < current
              ? 'bg-gradient-to-r from-magenta to-blue border-transparent text-white'
              : i + 1 === current
                ? 'border-magenta text-ink'
                : 'border-border-subtle/20 text-ink-dim'
          "
        >{{ i + 1 < current ? '✓' : i + 1 }}</span>
        <span
          class="hidden sm:inline whitespace-nowrap"
          :class="i + 1 === current ? 'text-ink' : 'text-ink-dim'"
        >{{ String(i + 1).padStart(2, '0') }} — {{ label }}</span>
      </div>
      <span
        v-if="i < steps.length - 1"
        class="flex-1 h-px mx-2 sm:mx-4 transition-colors"
        :class="i + 1 < current ? 'bg-gradient-to-r from-magenta to-blue' : 'bg-border-subtle/15'"
      ></span>
    </template>
  </div>
</template>
