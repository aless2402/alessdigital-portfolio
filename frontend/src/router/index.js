import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
import HomeView from '../views/HomeView.vue'
import PortfolioView from '../views/PortfolioView.vue'
import ContactView from '../views/ContactView.vue'
import ServiciosView from '../views/ServiciosView.vue'

// El inicio sigue siendo una sola página larga (scroll) para sus secciones
// generales. "Portafolio", "Servicios" y "Contacto" son páginas propias y
// dedicadas, con su URL limpia (sin #).
const routes = [
  { path: '/', name: 'inicio', component: HomeView, meta: { sectionId: 'inicio' } },
  { path: '/sobre-mi', name: 'sobre-mi', component: HomeView, meta: { sectionId: 'sobre-mi' } },
  { path: '/servicios', name: 'servicios', component: ServiciosView },
  { path: '/portafolio', name: 'portafolio', component: PortfolioView },
  { path: '/portafolio/:slug', name: 'proyecto', component: PortfolioView },
  { path: '/tecnologias', name: 'tecnologias', component: HomeView, meta: { sectionId: 'tecnologias' } },
  { path: '/testimonios', name: 'testimonios', component: HomeView, meta: { sectionId: 'testimonios' } },
  { path: '/contacto', name: 'contacto', component: ContactView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // El scroll se maneja abajo, a mano, para poder animarlo suave
    // y para poder ignorarlo en /portafolio/:slug (el modal no debe mover la página).
    return false
  }
})

router.afterEach((to, from) => {
  nextTick(() => {
    if (to.meta?.sectionId) {
      document.getElementById(to.meta.sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    // Si solo cambió el :slug del proyecto (se abrió/cerró el modal), no tocar el scroll.
    if (to.name === 'proyecto' && from.name === 'portafolio') return
    if (to.name === 'portafolio' && from.name === 'proyecto') return
    window.scrollTo({ top: 0 })
  })
})

export default router
