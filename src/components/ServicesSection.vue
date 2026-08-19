<script setup>
import { services } from '../data/services'

const preview = services.slice(0, 3)
</script>

<template>
  <section id="servicios" class="max-w-6xl mx-auto px-6 py-20">
    <div class="flex items-end justify-between flex-wrap gap-4 mb-12">
      <div>
        <p class="eyebrow mb-4" v-reveal>02 · servicios</p>
        <h2 class="font-display text-2xl sm:text-3xl font-semibold" v-reveal>Lo que puedo construir para ti</h2>
      </div>
      <router-link
        to="/servicios"
        v-reveal
        class="font-mono text-sm px-5 py-2.5 rounded-full border border-border-subtle/15 hover:border-border-subtle/40 transition-colors whitespace-nowrap"
      >Ver todos los servicios →</router-link>
    </div>

    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <router-link
        v-for="(service, i) in preview"
        :key="service.title"
        to="/servicios"
        v-reveal
        :style="{ transitionDelay: `${i * 80}ms` }"
        class="card rounded-2xl p-6 block"
      >
        <span class="text-2xl">{{ service.icon }}</span>
        <h3 class="font-display font-semibold mt-3 mb-2">{{ service.title }}</h3>
        <p class="text-sm text-ink-dim">{{ service.summary }}</p>
      </router-link>
    </div>
  </section>
</template>
