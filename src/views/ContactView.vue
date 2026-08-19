<script setup>
import { reactive, ref, computed } from 'vue'
import ThreeBackground from '../components/ThreeBackground.vue'
import ContactProgressSteps from '../components/ContactProgressSteps.vue'
import ContactSidebarCard from '../components/ContactSidebarCard.vue'

const serviceTypes = [
  { value: 'web', label: 'Desarrollo Web', icon: '🌐' },
  { value: 'saas', label: 'Sistema Web / SaaS', icon: '⚙️' },
  { value: 'ecommerce', label: 'E-commerce', icon: '🛒' },
  { value: 'api', label: 'API / Backend', icon: '🔌' },
  { value: 'frontend', label: 'Frontend / UI', icon: '🎨' },
  { value: 'mantenimiento', label: 'Mantenimiento / Optimización', icon: '🛠️' },
  { value: 'personalizado', label: 'Proyecto personalizado', icon: '💡' }
]

const budgetOptions = [
  '< S/ 1,000',
  'S/ 1,000 – S/ 2,500',
  'S/ 2,500 – S/ 5,000',
  'S/ 5,000 – S/ 10,000',
  '> S/ 10,000',
  'Necesito asesoría'
]

const timelineOptions = ['Lo antes posible', 'En 1–2 semanas', 'En 1 mes', 'Más adelante']

const step = ref(1)
const submitting = ref(false)
const submitted = ref(false)
const submitError = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  serviceType: '',
  description: '',
  budget: '',
  timeline: '',
  files: []
})

const touched = reactive({ step1: false, step2: false })

const step1Valid = computed(() => form.name.trim().length > 1 && /\S+@\S+\.\S+/.test(form.email))
const step2Valid = computed(() => form.serviceType && form.description.trim().length >= 10)

function goNext() {
  if (step.value === 1) {
    touched.step1 = true
    if (!step1Valid.value) return
  }
  if (step.value === 2) {
    touched.step2 = true
    if (!step2Valid.value) return
  }
  step.value = Math.min(4, step.value + 1)
}

function goBack() {
  step.value = Math.max(1, step.value - 1)
}

const MAX_FILES = 5
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB
const fileError = ref('')

function onFilesSelected(e) {
  const selected = Array.from(e.target.files || [])
  fileError.value = ''

  const tooBig = selected.filter((f) => f.size > MAX_SIZE)
  if (tooBig.length) {
    fileError.value = `Cada archivo debe pesar menos de 10 MB: ${tooBig.map((f) => f.name).join(', ')}`
  }

  const valid = selected.filter((f) => f.size <= MAX_SIZE)
  form.files = [...form.files, ...valid].slice(0, MAX_FILES)
  if (form.files.length >= MAX_FILES) {
    fileError.value = fileError.value || `Máximo ${MAX_FILES} archivos.`
  }
}

function removeFile(index) {
  form.files.splice(index, 1)
}

async function submitForm() {
  if (!step1Valid.value || !step2Valid.value) return
  submitting.value = true
  submitError.value = ''

  try {
    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) {
      submitError.value = 'Falta configurar VITE_API_URL en el .env del frontend.'
      return
    }

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    if (form.phone) formData.append('phone', form.phone)
    if (form.company) formData.append('company', form.company)
    if (form.serviceType) formData.append('service_type', form.serviceType)
    if (form.budget) formData.append('budget', form.budget)
    if (form.timeline) formData.append('timeline', form.timeline)
    formData.append('message', form.description)
    form.files.forEach((file) => formData.append('attachments[]', file))

    // No fijamos Content-Type a mano: el navegador arma el boundary del multipart.
    const res = await fetch(`${apiUrl}/contact`, { method: 'POST', body: formData })
    if (!res.ok) throw new Error(`request failed: ${res.status}`)
    submitted.value = true
  } catch (err) {
    submitError.value = 'No se pudo enviar el formulario. Intenta de nuevo o escríbeme directamente.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="relative min-h-screen overflow-hidden pt-28 pb-20">
    <ThreeBackground />
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/40 to-bg-deep pointer-events-none"></div>

    <div class="relative z-10 max-w-5xl mx-auto px-6">
      <p class="eyebrow mb-4">✨ contacto — alessdigital</p>
      <h1 class="font-display text-3xl sm:text-4xl font-semibold leading-tight max-w-2xl">
        ¿Tienes un proyecto en mente?<br />
        <span class="gradient-text">Hagámoslo realidad.</span>
      </h1>
      <p class="text-ink-dim max-w-xl mt-4 mb-12">
        Cuéntame sobre tu idea, negocio o proyecto. Diseñaré una solución digital
        estratégica, moderna y escalable según tus objetivos.
      </p>

      <div class="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
        <div class="card rounded-2xl p-6 sm:p-10">
          <template v-if="!submitted">
            <ContactProgressSteps :current="step" />

            <!-- Paso 01 · Información -->
            <div v-if="step === 1" class="space-y-5">
              <p class="eyebrow">01 — tus datos</p>

              <div>
                <label class="text-sm font-mono block mb-1.5">Nombre completo *</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="w-full bg-transparent border rounded-lg px-4 py-3 text-sm outline-none focus:border-magenta transition-colors"
                  :class="touched.step1 && !form.name.trim() ? 'border-magenta' : 'border-border-subtle/20'"
                  placeholder="Tu nombre y apellido"
                />
              </div>

              <div>
                <label class="text-sm font-mono block mb-1.5">Correo profesional *</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full bg-transparent border rounded-lg px-4 py-3 text-sm outline-none focus:border-magenta transition-colors"
                  :class="touched.step1 && !/\S+@\S+\.\S+/.test(form.email) ? 'border-magenta' : 'border-border-subtle/20'"
                  placeholder="tucorreo@empresa.com"
                />
              </div>

              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label class="text-sm font-mono block mb-1.5">WhatsApp / teléfono</label>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="w-full bg-transparent border border-border-subtle/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-magenta transition-colors"
                    placeholder="+51 900 000 000"
                  />
                </div>
                <div>
                  <label class="text-sm font-mono block mb-1.5">Empresa o marca</label>
                  <input
                    v-model="form.company"
                    type="text"
                    class="w-full bg-transparent border border-border-subtle/20 rounded-lg px-4 py-3 text-sm outline-none focus:border-magenta transition-colors"
                    placeholder="Opcional"
                  />
                </div>
              </div>
            </div>

            <!-- Paso 02 · Proyecto -->
            <div v-else-if="step === 2" class="space-y-6">
              <div>
                <p class="eyebrow mb-3">02 — tu proyecto</p>
                <label class="text-sm font-mono block mb-3">Tipo de servicio *</label>
                <div class="grid sm:grid-cols-2 gap-3">
                  <button
                    v-for="service in serviceTypes"
                    :key="service.value"
                    type="button"
                    @click="form.serviceType = service.value"
                    class="flex items-center gap-2.5 text-left text-sm px-4 py-3 rounded-lg border transition-colors"
                    :class="
                      form.serviceType === service.value
                        ? 'border-magenta bg-magenta/10'
                        : 'border-border-subtle/20 hover:border-border-subtle/40'
                    "
                  >
                    <span>{{ service.icon }}</span>
                    <span>{{ service.label }}</span>
                  </button>
                </div>
              </div>

              <div>
                <label class="text-sm font-mono block mb-1.5">Cuéntame sobre tu proyecto *</label>
                <textarea
                  v-model="form.description"
                  rows="5"
                  class="w-full bg-transparent border rounded-lg px-4 py-3 text-sm outline-none focus:border-magenta transition-colors resize-none"
                  :class="touched.step2 && form.description.trim().length < 10 ? 'border-magenta' : 'border-border-subtle/20'"
                  placeholder="Describe tu idea, objetivos, funcionalidades o problema que deseas resolver."
                ></textarea>
              </div>
            </div>

            <!-- Paso 03 · Presupuesto -->
            <div v-else-if="step === 3" class="space-y-6">
              <p class="eyebrow">03 — inversión</p>

              <div>
                <label class="text-sm font-mono block mb-3">Presupuesto estimado</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="option in budgetOptions"
                    :key="option"
                    type="button"
                    @click="form.budget = option"
                    class="text-xs font-mono px-4 py-2 rounded-full border transition-colors"
                    :class="
                      form.budget === option
                        ? 'border-magenta bg-magenta/10 text-ink'
                        : 'border-border-subtle/20 text-ink-dim hover:border-border-subtle/40'
                    "
                  >{{ option }}</button>
                </div>
              </div>

              <div>
                <label class="text-sm font-mono block mb-3">¿Cuándo te gustaría comenzar?</label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="option in timelineOptions"
                    :key="option"
                    type="button"
                    @click="form.timeline = option"
                    class="text-xs font-mono px-4 py-2 rounded-full border transition-colors"
                    :class="
                      form.timeline === option
                        ? 'border-magenta bg-magenta/10 text-ink'
                        : 'border-border-subtle/20 text-ink-dim hover:border-border-subtle/40'
                    "
                  >{{ option }}</button>
                </div>
              </div>
            </div>

            <!-- Paso 04 · Adjuntos y envío -->
            <div v-else-if="step === 4" class="space-y-6">
              <div>
                <p class="eyebrow mb-3">04 — material adicional</p>
                <label
                  class="flex flex-col items-center justify-center gap-2 border border-dashed border-border-subtle/25 rounded-lg px-4 py-8 text-center cursor-pointer hover:border-border-subtle/45 transition-colors"
                >
                  <span class="text-2xl">📎</span>
                  <span class="text-sm">Adjuntar brief, referencias, documentos o imágenes</span>
                  <span class="text-xs text-ink-dim font-mono">Opcional · PDF, DOCX, PNG, JPG, ZIP</span>
                  <input
                    type="file"
                    multiple
                    class="hidden"
                    accept=".pdf,.docx,.png,.jpg,.jpeg,.zip"
                    @change="onFilesSelected"
                  />
                </label>

                <ul v-if="form.files.length" class="mt-3 space-y-2">
                  <li
                    v-for="(file, i) in form.files"
                    :key="file.name + i"
                    class="flex items-center justify-between text-xs font-mono px-3 py-2 rounded-lg border border-border-subtle/15"
                  >
                    <span class="truncate">{{ file.name }}</span>
                    <button type="button" class="text-ink-dim hover:text-magenta ml-3" @click="removeFile(i)">✕</button>
                  </li>
                </ul>
                <p v-if="fileError" class="text-xs text-magenta mt-2">{{ fileError }}</p>
              </div>

              <div class="card rounded-xl p-5 text-sm space-y-1.5">
                <p class="font-mono text-xs text-ink-dim mb-2">Resumen</p>
                <p><span class="text-ink-dim">Nombre:</span> {{ form.name }}</p>
                <p><span class="text-ink-dim">Correo:</span> {{ form.email }}</p>
                <p><span class="text-ink-dim">Servicio:</span> {{ serviceTypes.find(s => s.value === form.serviceType)?.label || '—' }}</p>
                <p v-if="form.budget"><span class="text-ink-dim">Presupuesto:</span> {{ form.budget }}</p>
                <p v-if="form.timeline"><span class="text-ink-dim">Inicio:</span> {{ form.timeline }}</p>
              </div>

              <p v-if="submitError" class="text-sm text-magenta">{{ submitError }}</p>
            </div>

            <!-- Navegación -->
            <div class="flex items-center justify-between mt-10">
              <button
                v-if="step > 1"
                type="button"
                @click="goBack"
                class="font-mono text-sm px-5 py-2.5 rounded-full border border-border-subtle/15 hover:border-border-subtle/40 transition-colors"
              >← Atrás</button>
              <span v-else></span>

              <button
                v-if="step < 4"
                type="button"
                @click="goNext"
                class="font-mono text-sm px-6 py-3 rounded-full bg-gradient-to-r from-magenta to-blue hover:opacity-90 transition-opacity"
              >Siguiente →</button>

              <button
                v-else
                type="button"
                :disabled="submitting"
                @click="submitForm"
                class="font-mono text-sm px-6 py-3 rounded-full bg-gradient-to-r from-magenta to-blue hover:opacity-90 transition-opacity disabled:opacity-60"
              >{{ submitting ? 'Enviando…' : 'ENVIAR PROYECTO →' }}</button>
            </div>

            <p class="text-xs text-ink-dim font-mono text-center mt-6">
              Tu información es confidencial.<br />Cada proyecto comienza con una conversación.
            </p>
          </template>

          <!-- Estado de éxito -->
          <div v-else class="text-center py-10">
            <p class="text-4xl mb-4">🚀</p>
            <h2 class="font-display text-2xl font-semibold mb-3">¡Recibí tu proyecto!</h2>
            <p class="text-ink-dim max-w-sm mx-auto">
              Gracias, {{ form.name.split(' ')[0] }}. Voy a revisar los detalles y te
              respondo a {{ form.email }} en menos de 24 h.
            </p>
          </div>
        </div>

        <ContactSidebarCard />
      </div>
    </div>
  </section>
</template>
