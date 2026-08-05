# AlessDigital — Portafolio

Proyecto base en Vue 3 + Vite + Tailwind CSS, con la estructura de secciones acordada.

## Instalación

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Estructura

```
src/
├── App.vue                 # Ensambla todas las secciones
├── style.css                # Estilos globales + tokens de diseño (Tailwind)
└── components/
    ├── NavBar.vue
    ├── NetworkBackground.vue   # Fondo animado de red de nodos (canvas)
    ├── HeroSection.vue
    ├── AboutSection.vue
    ├── ServicesSection.vue
    ├── PortfolioSection.vue
    ├── TechnologiesSection.vue
    ├── ExperienceSection.vue     # Completar con roles reales
    ├── TestimonialsSection.vue   # Completar con reseñas reales
    ├── ContactSection.vue
    └── FooterSection.vue
```

## Pendientes de contenido

- `ExperienceSection.vue`: ya tiene tu trayectoria real (ISYSTEMS, Unity Perú, IBGROUP).
- `TestimonialsSection.vue`: llenar el array `testimonials` cuando tengas reseñas.
- Contacto ya usa tu correo real; agrega WhatsApp si quieres mostrarlo también.

## Build para producción

```bash
npm run build
```

Genera la carpeta `dist/`, lista para desplegar en Vercel.

## Backend (Laravel)

Este repo cubre solo el frontend. El backend en Laravel 12 (API REST + MySQL) se conecta
como proyecto aparte; el frontend consume sus endpoints vía `fetch`/`axios` apuntando a
tu API en el VPS. Los demos individuales de cada proyecto de portafolio pueden vivir en
subdominios tipo `demo.alessdigital.pe/proyecto`, apuntando cada uno a su propio deploy.
"# alessdigital-portfolio" 
