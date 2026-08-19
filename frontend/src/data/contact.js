// Número de WhatsApp para el botón "Hablemos" (asesorías), confirmado por Alessandra.
export const WHATSAPP_NUMBER = '51927967584'

export function whatsappLink(message = 'Hola AlessDigital, quiero una asesoría para mi proyecto.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
