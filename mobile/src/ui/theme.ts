import { EstadoServicio } from '../servicios/domain/servicio.schema';

// Paleta centralizada: cualquier pantalla importa estos tokens en vez de escribir
// colores sueltos. Cambiar el look de la app es cambiar este archivo, no cada pantalla.
export const colorFondo = 'bg-neutral-950';
export const colorSuperficie = 'bg-neutral-900';
export const colorBorde = 'border-neutral-800';
export const colorTextoPrimario = 'text-neutral-50';
export const colorTextoSecundario = 'text-neutral-400';
export const colorAccento = 'bg-amber-500';
export const colorAccentoTexto = 'text-amber-500';
export const colorSobreAccento = 'text-neutral-950';

export const coloresPorEstado: Record<EstadoServicio, string> = {
  PENDIENTE: 'bg-amber-500/15 text-amber-400',
  ASIGNADO: 'bg-blue-500/15 text-blue-400',
  EN_RUTA: 'bg-violet-500/15 text-violet-400',
  FINALIZADO: 'bg-emerald-500/15 text-emerald-400',
  CANCELADO: 'bg-neutral-600/30 text-neutral-400',
};

// Hex reales para props que no aceptan className (ActivityIndicator, RefreshControl, placeholderTextColor)
export const hexAccento = '#f59e0b';
export const hexTextoSecundario = '#a1a1aa';
