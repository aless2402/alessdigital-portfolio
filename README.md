# AlessDigital — Portafolio

Proyecto en Vue 3 + Vite + Tailwind CSS. Sitio de una página larga para el inicio, con
páginas propias y dedicadas para Servicios, Portafolio y Contacto (URLs limpias, sin `#`).

## Instalación

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Funcionalidades

- **Modo claro/oscuro**: botón ☀️/🌙 en el nav, persiste en `localStorage`. Oscuro es el
  tema por defecto.
- **Menú responsive**: menú hamburguesa en pantallas pequeñas.
- **Botón "Hablemos" → WhatsApp**: en vez de ir a la página de contacto, abre WhatsApp
  directo para asesorías rápidas. El número vive en `src/data/contact.js`
  (`WHATSAPP_NUMBER`), ya confirmado.
- **`/servicios`**: página dedicada con cada servicio explicado a fondo (qué incluye,
  para quién es ideal) y tu proceso de trabajo en 4 pasos. El inicio solo muestra 3
  servicios destacados con un botón "Ver todos los servicios →".
- **`/portafolio`**: página dedicada con los 6 proyectos completos. El inicio solo
  muestra 3 destacados con un botón "Explorar todos los proyectos →". Cada proyecto abre
  su detalle en un modal con URL propia (`/portafolio/crm`), compartible.
- **`/contacto`**: formulario premium por pasos (Información → Proyecto → Presupuesto →
  Enviar) con barra de progreso, fondo animado en **Three.js** y tarjeta lateral de
  disponibilidad. Envía `POST` (multipart) a `${VITE_API_URL}/contact` con los campos
  estructurados y hasta 5 archivos adjuntos (10 MB c/u).
- **Tecnologías con íconos reales**: cada tecnología del stack muestra su logo de marca
  (vía [Simple Icons](https://simpleicons.org), sin instalar ningún paquete de íconos).
- **Testimonios de clientes**: cualquier visitante puede dejar su propio testimonio desde
  un formulario en la sección de Testimonios. Se envía a `${VITE_API_URL}/testimonials`
  y queda pendiente de tu aprobación antes de mostrarse en el sitio (ver
  `backend/README.md`).
- **Animaciones al hacer scroll**: las secciones aparecen suavemente al entrar en pantalla
  (respeta `prefers-reduced-motion`).

## Estructura

```
src/
├── App.vue                      # NavBar + <router-view/> + Footer
├── style.css                    # Tokens de color (claro/oscuro) + estilos globales
├── router/
│   └── index.js                 # Rutas limpias + scroll entre secciones del inicio
├── data/
│   ├── projects.js               # Datos de los 6 proyectos (única fuente de verdad)
│   ├── services.js               # Datos detallados de servicios + proceso de trabajo
│   └── contact.js                # Número de WhatsApp y helper de enlace
├── composables/
│   ├── useTheme.js                # Lógica del toggle claro/oscuro
│   └── useReveal.js               # Directiva v-reveal (animación al scroll)
├── views/
│   ├── HomeView.vue               # Inicio: Hero, Sobre mí, destacados, Tecnologías, etc.
│   ├── ServiciosView.vue          # Página dedicada /servicios
│   ├── PortfolioView.vue          # Página dedicada /portafolio con los 6 proyectos
│   └── ContactView.vue            # Página dedicada /contacto: formulario premium
└── components/
    ├── NavBar.vue                  # Toggle de tema, menú móvil, "Hablemos" → WhatsApp
    ├── NetworkBackground.vue       # Fondo animado 2D del hero (canvas)
    ├── ThreeBackground.vue         # Fondo animado 3D de contacto (three.js)
    ├── HeroSection.vue
    ├── AboutSection.vue
    ├── ServicesSection.vue         # Teaser en el inicio, enlaza a /servicios
    ├── PortfolioTeaser.vue         # Teaser en el inicio, enlaza a /portafolio
    ├── ProjectImage.vue            # Imagen con fallback a gradiente
    ├── ProjectModal.vue            # Detalle de proyecto en la misma página
    ├── TechnologiesSection.vue     # Con íconos de cada tecnología
    ├── TestimonialsSection.vue     # Lista + formulario para que un cliente deje el suyo
    ├── ContactSection.vue          # Teaser corto en el inicio, enlaza a /contacto
    ├── ContactProgressSteps.vue    # Barra de progreso del formulario por pasos
    ├── ContactSidebarCard.vue      # Tarjeta lateral de disponibilidad
    └── FooterSection.vue
```

## Pendientes de contenido

- `public/images/projects/`: agregar las capturas reales de cada proyecto
  (`crm.jpg`, `inventario.jpg`, `facturacion.jpg`, `carnet-sanidad.jpg`,
  `filmografia.jpg`, `2a-proyect.jpg`). Mientras no existan, se ve el placeholder.
- `TestimonialsSection.vue`: reemplazar el array vacío por los testimonios ya aprobados,
  o conectarlo a `/testimonials` para que salgan de la base de datos automáticamente.

## Build para producción

```bash
npm run build
```

Genera la carpeta `dist/`, lista para desplegar en Vercel. `vercel.json` ya trae la
reescritura necesaria para que las rutas limpias no den 404 al recargar.

## Backend (Laravel)

Este repo cubre solo el frontend. El backend en Laravel 12 (API REST + MySQL) vive en
`../backend` — ver su README para instalación, endpoints, notificación por correo y
aprobación de testimonios.
