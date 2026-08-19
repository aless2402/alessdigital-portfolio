<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'slug' => 'crm',
                'title' => 'Freelancer CRM',
                'description' => 'Gestión de clientes, propuestas y pagos para profesionales independientes.',
                'demo_url' => 'https://demo.alessdigital.pe/crm',
                'tech_stack' => ['Vue 3', 'Laravel', 'MySQL'],
                'order' => 1,
            ],
            [
                'slug' => 'inventario',
                'title' => 'Sistema de Inventario',
                'description' => 'Control de stock, alertas de quiebre y reportes por almacén.',
                'demo_url' => 'https://demo.alessdigital.pe/inventario',
                'tech_stack' => ['Vue 3', 'Laravel', 'MySQL'],
                'order' => 2,
            ],
            [
                'slug' => 'facturacion',
                'title' => 'Facturación Electrónica',
                'description' => 'Emisión de comprobantes válidos ante SUNAT, integrado a ventas.',
                'demo_url' => 'https://demo.alessdigital.pe/facturacion',
                'tech_stack' => ['Vue 3', 'Laravel', 'MySQL'],
                'order' => 3,
            ],
            [
                'slug' => 'carnet-sanidad',
                'title' => 'Carnet de Sanidad',
                'description' => 'Registro y verificación digital de carnets sanitarios municipales.',
                'demo_url' => 'https://demo.alessdigital.pe/carnet-sanidad',
                'tech_stack' => ['Vue 3', 'Laravel', 'MySQL'],
                'order' => 4,
            ],
            [
                'slug' => 'filmografia',
                'title' => 'Filmografía CMS',
                'description' => 'Catálogo administrable de producciones audiovisuales.',
                'demo_url' => 'https://demo.alessdigital.pe/filmografia',
                'tech_stack' => ['Vue 3', 'Laravel', 'MySQL'],
                'order' => 5,
            ],
            [
                'slug' => '2a-proyect',
                'title' => '2A Proyect S.A.C.',
                'description' => 'Sitio corporativo para una empresa de ingeniería y construcción: galería de obras, servicios y contacto integrado a WhatsApp.',
                'demo_url' => 'https://2aproyect.com.pe/',
                'tech_stack' => ['HTML', 'CSS', 'JavaScript'],
                'order' => 6,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(['slug' => $project['slug']], $project);
        }
    }
}
