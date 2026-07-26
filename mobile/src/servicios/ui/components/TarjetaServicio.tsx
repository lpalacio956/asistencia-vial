import { Alert, Pressable, Text, View } from 'react-native';
import { Servicio } from '../../domain/servicio.schema';
import { transicionesPermitidas } from '../../domain/transiciones-estado';
import { useServicios } from '../../state/use-servicios';
import { ErrorApi } from '../../data/api.error';
import { colorBorde, colorSuperficie, colorTextoPrimario, colorTextoSecundario, coloresPorEstado } from '../../../ui/theme';

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
    <View className={`mb-3 rounded-xl border ${colorBorde} ${colorSuperficie} p-4`}>
      <View className="flex-row items-center justify-between">
        <Text className={`text-base font-semibold ${colorTextoPrimario}`}>
          {ETIQUETA_TIPO[servicio.tipo]}
        </Text>
        <Text
          className={`overflow-hidden rounded-full px-2 py-1 text-xs font-medium ${coloresPorEstado[servicio.estado]}`}
        >
          {ETIQUETA_ESTADO[servicio.estado]}
        </Text>
      </View>
      <Text className={`mt-1 text-sm ${colorTextoSecundario}`}>{servicio.descripcion}</Text>
      <Text className={`mt-0.5 text-sm ${colorTextoSecundario}`}>{servicio.ubicacion}</Text>

      {estadosSiguientes.length > 0 && (
        <View className="mt-3 flex-row flex-wrap gap-2">
          {estadosSiguientes.map((estado) => (
            <Pressable
              key={estado}
              onPress={() => intentarCambiarEstado(estado)}
              className="rounded-lg bg-neutral-800 px-3 py-1.5 active:bg-neutral-700"
            >
              <Text className="text-xs font-medium text-neutral-200">
                → {ETIQUETA_ESTADO[estado]}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
