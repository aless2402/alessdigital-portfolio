const raw = [
  {
    slug: 'crm',
    title: 'Freelancer CRM',
    description:
      'Gestión de clientes, propuestas y pagos para profesionales independientes.',
    tech: ['Vue 3', 'Laravel', 'MySQL'],
    image: '/images/projects/crm.jpg',
    icon: '/images/projects/icons/crm.svg',
    gradient: 'from-magenta to-blue',
    featured: true
  },

  {
    slug: 'inventario',
    title: 'Sistema de Inventario',
    description:
      'Control de stock, alertas de quiebre y reportes por almacén.',
    tech: ['Vue 3', 'Laravel', 'MySQL'],
    image: '/images/projects/inventario.jpg',
    icon: '/images/projects/icons/inventario.svg',
    gradient: 'from-blue to-cyan',
    featured: true
  },

  {
    slug: 'facturacion',
    title: 'Facturación Electrónica',
    description:
      'Emisión de comprobantes válidos ante SUNAT, integrado a ventas.',
    tech: ['Vue 3', 'Laravel', 'MySQL'],
    image: '/images/projects/facturacion.jpg',
    icon: '/images/projects/icons/facturacion.svg',
    gradient: 'from-cyan to-magenta',
    featured: true
  },

  {
    slug: 'carnet-sanidad',
    title: 'Carnet de Sanidad',
    description:
      'Registro y verificación digital de carnets sanitarios municipales.',
    tech: ['Vue 3', 'Laravel', 'MySQL'],
    image: '/images/projects/carnet_sanidad_sistema.png',
    icon: '/images/projects/icons/logo-bellavista.ico',
    gradient: 'from-gold to-magenta',
    featured: false
  },

  {
    slug: 'filmografia',
    title: 'Filmografía CMS',
    description:
      'Catálogo administrable de producciones audiovisuales.',
    tech: ['Vue 3', 'Laravel', 'MySQL'],
    image: '/images/projects/filmografia-web.jpg',
    icon: '/images/projects/icons/filmografia-web.ico',
    gradient: 'from-magenta to-gold',
    featured: false
  },

  {
    slug: '2a-proyect',
    title: '2A Proyect S.A.C.',
    description:
      'Sitio web corporativo para una empresa de ingeniería, diseño, construcción y servicios generales, con presentación de proyectos, servicios y formulario de contacto.',
    tech: ['Vue 3', 'Tailwind CSS'],
    image: '/images/projects/2Aproyect.png',
    icon: '/images/projects/icons/2aproyect.ico',
    gradient: 'from-blue to-gold',
    featured: true,
    url: 'https://2aproyect.com.pe/'
  }
]

export const projects = raw.map((project) => ({
  ...project,
  demoPath: `demo.alessdigital.pe/${project.slug}`,
  demoUrl:
    project.url ||
    `https://demo.alessdigital.pe/${project.slug}`
}))

export const featuredProjects = projects.filter(
  (project) => project.featured
)
