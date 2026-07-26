import { Alert, Pressable, Text, View } from 'react-native';
import { Servicio } from '../../domain/servicio.schema';
import { transicionesPermitidas } from '../../domain/transiciones-estado';
import { useServicios } from '../../state/use-servicios';
import { ErrorApi } from '../../data/api.error';

const ETIQUETA_TIPO: Record<Servicio['tipo'], string> = {
  GRUA: 'Grúa',
  BATERIA: 'Batería',
  LLANTA: 'Llanta',
  COMBUSTIBLE: 'Combustible',
  CERRAJERIA: 'Cerrajería',
};

const ETIQUETA_ESTADO: Record<Servicio['estado'], string> = {
  PENDIENTE: 'Pendiente',
  ASIGNADO: 'Asignado',
  EN_RUTA: 'En ruta',
  FINALIZADO: 'Finalizado',
  CANCELADO: 'Cancelado',
};

const COLOR_ESTADO: Record<Servicio['estado'], string> = {
  PENDIENTE: 'bg-amber-100 text-amber-800',
  ASIGNADO: 'bg-blue-100 text-blue-800',
  EN_RUTA: 'bg-indigo-100 text-indigo-800',
  FINALIZADO: 'bg-emerald-100 text-emerald-800',
  CANCELADO: 'bg-slate-200 text-slate-600',
};

interface Props {
  servicio: Servicio;
}

export function TarjetaServicio({ servicio }: Props) {
  const { cambiarEstadoServicio } = useServicios();

  async function intentarCambiarEstado(estado: Servicio['estado']) {
    try {
      await cambiarEstadoServicio(servicio.id, estado);
    } catch (error) {
      const mensaje = error instanceof ErrorApi ? error.message : 'No se pudo cambiar el estado.';
      Alert.alert('No se pudo cambiar el estado', mensaje);
    }
  }

  const estadosSiguientes = transicionesPermitidas(servicio.estado);

  return (
    <View className="mb-3 rounded-xl border border-slate-200 bg-white p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold text-slate-900">
          {ETIQUETA_TIPO[servicio.tipo]}
        </Text>
        <Text
          className={`overflow-hidden rounded-full px-2 py-1 text-xs font-medium ${COLOR_ESTADO[servicio.estado]}`}
        >
          {ETIQUETA_ESTADO[servicio.estado]}
        </Text>
      </View>
      <Text className="mt-1 text-sm text-slate-600">{servicio.descripcion}</Text>
      <Text className="mt-0.5 text-sm text-slate-400">{servicio.ubicacion}</Text>

      {estadosSiguientes.length > 0 && (
        <View className="mt-3 flex-row flex-wrap gap-2">
          {estadosSiguientes.map((estado) => (
            <Pressable
              key={estado}
              onPress={() => intentarCambiarEstado(estado)}
              className="rounded-lg bg-slate-100 px-3 py-1.5 active:bg-slate-200"
            >
              <Text className="text-xs font-medium text-slate-700">
                → {ETIQUETA_ESTADO[estado]}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
