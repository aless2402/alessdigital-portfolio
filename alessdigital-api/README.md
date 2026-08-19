# AlessDigital — Backend API (Laravel 12)

Guía de instalación de un solo tirón. Sigue los pasos **en este orden exacto** — cada
uno existe porque en el camino nos topamos con el error de saltárselo.

## 0. Requisitos

PHP 8.2+, Composer y MySQL instalados en tu máquina. Verifica con:

```bash
php -v
composer --version
```

## 1. Crear el proyecto Laravel

```bash
composer create-project laravel/laravel:^12.0 alessdigital-api
cd alessdigital-api
```

## 2. Copiar los archivos de este paquete

Copia el contenido de este zip **encima** del proyecto recién creado, respetando las
rutas exactas (ojo con mayúsculas/minúsculas en `Api`):

```
app/Models/Project.php
app/Models/Experience.php
app/Models/Testimonial.php
app/Models/ContactMessage.php
app/Mail/NewContactMessage.php
app/Http/Controllers/Api/ProjectController.php
app/Http/Controllers/Api/ExperienceController.php
app/Http/Controllers/Api/TestimonialController.php
app/Http/Controllers/Api/ContactController.php
resources/views/emails/contact-message.blade.php
database/migrations/2026_01_01_000001_create_projects_table.php
database/migrations/2026_01_01_000002_create_experiences_table.php
database/migrations/2026_01_01_000003_create_testimonials_table.php
database/migrations/2026_01_01_000004_create_contact_messages_table.php
database/seeders/PortfolioSeeder.php
routes/api.php          ← REEMPLAZA el que trae Laravel por defecto
config/cors.php          ← este archivo NO existe en un Laravel nuevo, créalo
bootstrap/app.php        ← REEMPLAZA el que trae Laravel por defecto
```

`bootstrap/app.php` va reemplazado completo porque Laravel 12 **no activa
`routes/api.php` automáticamente** — el que incluyo aquí ya tiene la línea
`api: __DIR__.'/../routes/api.php'` agregada.

## 3. Configurar `.env`

Copia el contenido de `.env.example` (de este paquete) dentro de tu `.env` recién creado.
Ya trae la base de datos MySQL y el SMTP de Gmail armados — solo genera tu contraseña de
aplicación en `myaccount.google.com/apppasswords` (con la verificación en 2 pasos activada)
y pégala en `MAIL_PASSWORD`.

Luego:

```bash
php artisan key:generate
```

## 4. Crear la base de datos

```bash
mysql -u root -p -e "CREATE DATABASE alessdigital CHARACTER SET utf8mb4;"
```

## 5. Instalar dependencias, migrar, sembrar y enlazar storage

```bash
composer install
php artisan migrate
php artisan db:seed --class=Database\Seeders\PortfolioSeeder
php artisan storage:link
```

(En Windows PowerShell/CMD, la barra invertida NO se escapa doble — es tal cual como
está arriba, sin `\\`.)

## 6. Levantar el servidor

```bash
php artisan serve
```

Prueba primero lo más simple: abre `http://127.0.0.1:8000/api/projects` en el navegador.
Si ves un JSON con 6 proyectos, todo el backend está bien conectado.

## 7. Endpoints

| Método | Endpoint               | Descripción                                                                      |
|--------|-------------------------|-----------------------------------------------------------------------------------|
| GET    | `/api/projects`        | Lista de proyectos del portafolio                                                 |
| GET    | `/api/projects/{slug}` | Detalle de un proyecto                                                            |
| GET    | `/api/testimonials`    | Testimonios publicados                                                            |
| POST   | `/api/testimonials`    | Un cliente envía su propio testimonio (queda sin publicar hasta que lo apruebes)  |
| POST   | `/api/contact`         | Guarda el mensaje en la base de datos y te avisa por correo (con adjuntos)        |

## 8. Conectar el frontend

En `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

El formulario de contacto y el de "dejar tu testimonio" ya hacen `POST` real a estos
endpoints — no falta cablear nada del lado del frontend.

## 9. Revisar mensajes y aprobar testimonios

Sin panel de administración todavía, usa `php artisan tinker`:

```php
\App\Models\ContactMessage::latest()->get();       // ver mensajes de contacto guardados
\App\Models\Testimonial::where('published', false)->get(); // testimonios pendientes
\App\Models\Testimonial::find(1)->update(['published' => true]); // aprobar uno
```

## 10. Si el correo no llega

1. Revisa `storage/logs/laravel.log` — el `ContactController` deja un `Log::error(...)`
   explícito ahí mismo si el envío falla (credenciales SMTP incorrectas, etc.).
2. El mensaje SIEMPRE queda guardado en la base de datos aunque el correo falle
   (son dos pasos independientes) — revisa con `tinker` si dudas si algo se envió.
3. Si no tienes SMTP a mano todavía, cambia `MAIL_MAILER=log` en tu `.env` — los
   correos se escriben en el log en vez de enviarse, para probar sin bloquearte.
4. **Nunca compartas tu `MAIL_PASSWORD` por chat ni en un zip** — si se expone, revócala
   en `myaccount.google.com/apppasswords` y genera una nueva.

## 11. Producción

- Backend: sube el proyecto a tu VPS, configura Nginx/Apache apuntando a `public/`,
  y ajusta `APP_URL` y `allowed_origins` en `config/cors.php` a tu dominio real.
- Frontend: `npm run build` en `frontend/` y despliega `dist/` en Vercel, apuntando
  `VITE_API_URL` a tu dominio del backend (ej. `https://api.alessdigital.pe/api`).
