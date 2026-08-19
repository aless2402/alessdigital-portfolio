const raw = [
  {
    slug: 'crm',
    title: 'Freelancer CRM',
    description: 'Gestión de clientes, propuestas y pagos para profesionales independientes.',
    tech: ['Vue 3', 'Laravel', 'MySQL'],
    image: '/images/projects/crm.jpg',
    gradient: 'from-magenta to-blue',
    icon: '◈',
    featured: true
  },
  {
    slug: 'inventario',
    title: 'Sistema de Inventario',
    description: 'Control de stock, alertas de quiebre y reportes por almacén.',
    tech: ['Vue 3', 'Laravel', 'MySQL'],
    image: '/images/projects/inventario.jpg',
    gradient: 'from-blue to-cyan',
    icon: '▦',
    featured: true
  },
  {
    slug: 'facturacion',
    title: 'Facturación Electrónica',
    description: 'Emisión de comprobantes válidos ante SUNAT, integrado a ventas.',
    tech: ['Vue 3', 'Laravel', 'MySQL'],
    image: '/images/projects/facturacion.jpg',
    gradient: 'from-cyan to-magenta',
    icon: '▤',
    featured: true
  },
  {
    slug: 'carnet-sanidad',
    title: 'Carnet de Sanidad',
    description: 'Registro y verificación digital de carnets sanitarios municipales.',
    tech: ['Vue 3', 'Laravel', 'MySQL'],
    image: '/images/projects/carnet-sanidad.jpg',
    gradient: 'from-gold to-magenta',
    icon: '◉',
    featured: false
  },
  {
    slug: 'filmografia',
    title: 'Filmografía CMS',
    description: 'Catálogo administrable de producciones audiovisuales.',
    tech: ['Vue 3', 'Laravel', 'MySQL'],
    image: '/images/projects/filmografia.jpg',
    gradient: 'from-magenta to-gold',
    icon: '▶',
    featured: false
  },
  {
    // Proyecto real (reemplaza el placeholder genérico de "Landing Pages").
    slug: '2a-proyect',
    title: '2A Proyect S.A.C.',
    description: 'Sitio corporativo para una empresa de ingeniería y construcción: galería de obras ejecutadas, catálogo de servicios generales y formulario de contacto integrado directo a WhatsApp.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '/images/projects/2a-proyect.jpg',
    gradient: 'from-blue to-gold',
    icon: '◆',
    featured: false,
    demoPath: '2aproyect.com.pe',
    demoUrl: 'https://2aproyect.com.pe/'
  }
]

export const projects = raw.map((p) => ({
  demoPath: `demo.alessdigital.pe/${p.slug}`,
  demoUrl: `https://demo.alessdigital.pe/${p.slug}`,
  ...p
}))

export const featuredProjects = projects.filter((p) => p.featured)
