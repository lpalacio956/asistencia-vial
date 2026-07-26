import { EstadoServicio } from '../servicios/domain/servicio.schema';

// Paleta centralizada: cualquier pantalla importa estos tokens en vez de escribir
// colores sueltos. Cambiar el look de la app es cambiar este archivo, no cada pantalla.
export const colorFondo = 'bg-neutral-950';
export const colorSuperficie = 'bg-neutral-900';
export const colorSuperficieElevada = 'bg-neutral-800';
export const colorBorde = 'border-neutral-800';
export const colorBordeElevado = 'border-neutral-700';
export const colorTextoPrimario = 'text-neutral-50';
export const colorTextoSecundario = 'text-neutral-400';
export const colorAccento = 'bg-amber-500';
export const colorAccentoTexto = 'text-amber-500';
export const colorSobreAccento = 'text-neutral-950';

// Geometría de la barra de pestañas flotante, compartida entre TabBarInferior
// (para su posición) y las pantallas (para el padding-bottom de sus listas) —
// un solo lugar para que ambos números nunca queden desincronizados.
export const ALTO_TAB_BAR_FLOTANTE = 56;
export const MARGEN_INFERIOR_TAB_BAR = 16;
export const ESPACIO_EXTRA_LISTA = 24;

/** Cuánto padding-bottom necesita una lista para que su último item no quede tapado por la píldora. */
export function paddingListaSobreTabBar(insetBottom: number): number {
  return insetBottom + MARGEN_INFERIOR_TAB_BAR + ALTO_TAB_BAR_FLOTANTE + ESPACIO_EXTRA_LISTA;
}

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
