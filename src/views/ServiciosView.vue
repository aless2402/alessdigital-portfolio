<script setup>
import { services, process } from '../data/services'
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 pt-32 pb-20">
    <p class="eyebrow mb-4">servicios</p>
    <h1 class="font-display text-3xl sm:text-4xl font-semibold mb-4 max-w-2xl">
      Soluciones digitales a la medida de tu negocio.
    </h1>
    <p class="text-ink-dim max-w-xl mb-16">
      No vendo plantillas: cada proyecto empieza entendiendo tu problema real y termina
      en un sistema que tu equipo puede usar sin depender de mí para todo.
    </p>

    <div class="grid sm:grid-cols-2 gap-6 mb-20">
      <div v-for="service in services" :key="service.title" class="card rounded-2xl p-6 sm:p-7">
        <span class="text-3xl">{{ service.icon }}</span>
        <h2 class="font-display text-xl font-semibold mt-4 mb-2">{{ service.title }}</h2>
        <p class="text-sm text-ink-dim mb-4">{{ service.summary }}</p>

        <p class="font-mono text-xs text-cyan mb-2">Incluye</p>
        <ul class="space-y-1.5 mb-4">
          <li
            v-for="item in service.includes"
            :key="item"
            class="text-sm text-ink-dim flex gap-2"
          >
            <span class="text-magenta">•</span>{{ item }}
          </li>
        </ul>

        <p class="text-xs text-ink-dim font-mono border-t border-border-subtle/10 pt-3">
          Ideal para: {{ service.idealFor }}
        </p>
      </div>
    </div>

    <div class="mb-20">
      <p class="eyebrow mb-4">cómo trabajo</p>
      <h2 class="font-display text-2xl sm:text-3xl font-semibold mb-10">Mi proceso, paso a paso</h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="item in process" :key="item.step" class="card rounded-2xl p-6">
          <span class="font-mono text-3xl gradient-text">{{ item.step }}</span>
          <h3 class="font-display font-semibold mt-3 mb-2">{{ item.title }}</h3>
          <p class="text-sm text-ink-dim">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <div class="card rounded-2xl p-8 sm:p-10 text-center">
      <h2 class="font-display text-2xl font-semibold mb-3">¿Cuál de estos necesitas?</h2>
      <p class="text-ink-dim mb-6 max-w-md mx-auto">
        Cuéntame tu idea. Yo me encargo de convertirla en una solución digital.
      </p>
      <router-link
        to="/contacto"
        class="inline-block font-mono text-sm px-6 py-3 rounded-full bg-gradient-to-r from-magenta to-blue hover:opacity-90 transition-opacity"
      >Empezar mi proyecto →</router-link>
    </div>
  </section>
</template>
