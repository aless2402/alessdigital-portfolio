@component('mail::message')
# Nuevo proyecto desde el portafolio

**Nombre:** {{ $contactMessage->name }}
**Correo:** {{ $contactMessage->email }}
**Teléfono:** {{ $contactMessage->phone ?? '—' }}
**Empresa:** {{ $contactMessage->company ?? '—' }}
**Servicio:** {{ $contactMessage->service_type ?? '—' }}
**Presupuesto:** {{ $contactMessage->budget ?? '—' }}
**Inicio deseado:** {{ $contactMessage->timeline ?? '—' }}

## Descripción del proyecto
{{ $contactMessage->message }}

@if(!empty($contactMessage->attachments))
## Adjuntos
@foreach($contactMessage->attachments as $file)
- [{{ $file['name'] }}]({{ url($file['url']) }})
@endforeach
@endif

@component('mail::button', ['url' => 'mailto:' . $contactMessage->email])
Responder a {{ $contactMessage->name }}
@endcomponent

Gracias,<br>
AlessDigital
@endcomponent
