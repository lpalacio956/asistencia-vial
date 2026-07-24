import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useServicios } from '../state/use-servicios';
import { TarjetaServicio } from './components/TarjetaServicio';

export function ListaServiciosScreen() {
  const { servicios, cargando, error, recargar } = useServicios();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-4 pt-4">
        <Text className="mb-4 text-xl font-bold text-slate-900">Servicios de asistencia vial</Text>

        {error && (
          <View className="mb-3 rounded-lg bg-red-50 p-3">
            <Text className="text-sm text-red-700">{error}</Text>
          </View>
        )}

        {cargando && servicios.length === 0 ? (
          <ActivityIndicator className="mt-8" />
        ) : servicios.length === 0 ? (
          <Text className="mt-8 text-center text-sm text-slate-400">
            No hay servicios todavía.
          </Text>
        ) : (
          <FlatList
            data={servicios}
            keyExtractor={(servicio) => servicio.id}
            renderItem={({ item }) => <TarjetaServicio servicio={item} />}
            refreshControl={<RefreshControl refreshing={cargando} onRefresh={recargar} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
