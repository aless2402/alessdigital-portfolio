<script setup>
import { ref, reactive } from 'vue'

// Reemplaza este array con reseñas reales ya aprobadas, o cárgalo desde
// `${VITE_API_URL}/testimonials` cuando quieras que salgan de la base de datos.
const testimonials = []

const showForm = ref(false)
const submitting = ref(false)
const submitted = ref(false)
const errorMsg = ref('')

const form = reactive({ name: '', role: '', quote: '' })

async function submitTestimonial() {
  errorMsg.value = ''
  if (form.name.trim().length < 2 || form.quote.trim().length < 10) {
    errorMsg.value = 'Cuéntame un poco más: tu nombre y un testimonio de al menos unas palabras.'
    return
  }

  submitting.value = true
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    if (apiUrl) {
      const res = await fetch(`${apiUrl}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('request failed')
    }
    submitted.value = true
  } catch (err) {
    errorMsg.value = 'No se pudo enviar. Intenta de nuevo en un momento.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section id="testimonios" class="max-w-6xl mx-auto px-6 py-20">
    <div class="flex items-end justify-between flex-wrap gap-4 mb-10">
      <div>
        <p class="eyebrow mb-4" v-reveal>06 · testimonios</p>
        <h2 class="font-display text-2xl sm:text-3xl font-semibold" v-reveal>Lo que dicen mis clientes</h2>
      </div>
      <button
        v-if="!showForm && !submitted"
        type="button"
        v-reveal
        @click="showForm = true"
        class="font-mono text-sm px-5 py-2.5 rounded-full border border-border-subtle/15 hover:border-border-subtle/40 transition-colors whitespace-nowrap"
      >¿Trabajamos juntos? Deja tu testimonio</button>
    </div>

    <div v-if="testimonials.length === 0 && !showForm" class="card rounded-2xl p-8" v-reveal>
      <p class="text-sm text-ink-dim font-mono">— espacio reservado para reseñas de clientes —</p>
    </div>

    <div v-else-if="testimonials.length" class="grid sm:grid-cols-2 gap-6 mb-8">
      <div v-for="item in testimonials" :key="item.name" class="card rounded-2xl p-6" v-reveal>
        <p class="text-sm text-ink-dim italic mb-4">{{ item.quote }}</p>
        <p class="font-mono text-xs">{{ item.name }} — {{ item.role }}</p>
      </div>
    </div>

    <!-- Formulario para que un cliente deje su testimonio -->
    <div v-if="showForm && !submitted" class="card rounded-2xl p-6 sm:p-8 max-w-lg">
      <div class="space-y-4">
        <div>
          <label class="text-sm font-mono block mb-1.5">Tu nombre *</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full bg-transparent border border-border-subtle/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-magenta transition-colors"
            placeholder="Nombre y apellido"
          />
        </div>
        <div>
          <label class="text-sm font-mono block mb-1.5">Cargo o empresa</label>
          <input
            v-model="form.role"
            type="text"
            class="w-full bg-transparent border border-border-subtle/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-magenta transition-colors"
            placeholder="Opcional"
          />
        </div>
        <div>
          <label class="text-sm font-mono block mb-1.5">Tu testimonio *</label>
          <textarea
            v-model="form.quote"
            rows="4"
            class="w-full bg-transparent border border-border-subtle/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-magenta transition-colors resize-none"
            placeholder="Cuenta cómo fue trabajar conmigo y el resultado que obtuviste."
          ></textarea>
        </div>

        <p v-if="errorMsg" class="text-sm text-magenta">{{ errorMsg }}</p>

        <div class="flex items-center gap-3">
          <button
            type="button"
            :disabled="submitting"
            @click="submitTestimonial"
            class="font-mono text-sm px-6 py-3 rounded-full bg-gradient-to-r from-magenta to-blue hover:opacity-90 transition-opacity disabled:opacity-60"
          >{{ submitting ? 'Enviando…' : 'Enviar testimonio' }}</button>
          <button
            type="button"
            @click="showForm = false"
            class="font-mono text-sm text-ink-dim hover:text-ink transition-colors"
          >Cancelar</button>
        </div>
      </div>
    </div>

    <div v-else-if="submitted" class="card rounded-2xl p-8 text-center max-w-lg" v-reveal>
      <p class="text-2xl mb-3">🙌</p>
      <p class="text-sm text-ink-dim">
        Gracias por tu testimonio. Quedará publicado aquí en cuanto lo revise.
      </p>
    </div>
  </section>
</template>
