<script setup>
const stack = ['PHP', 'Laravel', 'Vue.js', 'APIs', 'PostgreSQL']
</script>

<template>
  <aside class="card rounded-2xl p-6 sm:p-8 lg:sticky lg:top-28 h-fit">
    <p class="font-display font-semibold text-lg">Aless<span class="gradient-text">Digital</span></p>
    <p class="text-sm text-ink-dim mt-1">Full Stack Developer</p>

    <div class="flex flex-wrap gap-2 mt-5">
      <span
        v-for="tech in stack"
        :key="tech"
        class="font-mono text-[11px] px-2.5 py-1 rounded-full border border-border-subtle/15 text-ink-dim"
      >{{ tech }}</span>
    </div>

    <div class="mt-6 pt-6 border-t border-border-subtle/10">
      <p class="flex items-center gap-2 text-sm">
        <span class="relative flex w-2 h-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full w-2 h-2 bg-emerald-400"></span>
        </span>
        Disponible para nuevos proyectos
      </p>
      <p class="text-xs text-ink-dim mt-2">Respondo normalmente en menos de 24 h</p>
    </div>
  </aside>
</template>
