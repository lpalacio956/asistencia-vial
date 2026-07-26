import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useServicios } from '../state/use-servicios';
import { TarjetaServicio } from './components/TarjetaServicio';
import { FormularioCrearServicio } from './components/FormularioCrearServicio';
import { colorTextoPrimario, colorTextoSecundario, hexAccento, paddingListaSobreTabBar } from '../../ui/theme';

export function ServiciosScreen() {
  const { serviciosActivos, cargando, error, recargar } = useServicios();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 px-4 pt-4">
      <Text className={`mb-4 text-xl font-bold ${colorTextoPrimario}`}>Servicios activos</Text>

      <FormularioCrearServicio />

      {error && (
        <View className="mb-3 rounded-lg bg-red-500/10 p-3">
          <Text className="text-sm text-red-400">{error}</Text>
        </View>
      )}

      {cargando && serviciosActivos.length === 0 ? (
        <ActivityIndicator className="mt-8" color={hexAccento} />
      ) : serviciosActivos.length === 0 ? (
        <Text className={`mt-8 text-center text-sm ${colorTextoSecundario}`}>
          No hay servicios activos todavía.
        </Text>
      ) : (
        <FlatList
          data={serviciosActivos}
          keyExtractor={(servicio) => servicio.id}
          renderItem={({ item }) => <TarjetaServicio servicio={item} />}
          contentContainerStyle={{ paddingBottom: paddingListaSobreTabBar(insets.bottom) }}
          refreshControl={
            <RefreshControl refreshing={cargando} onRefresh={recargar} tintColor={hexAccento} />
          }
        />
      )}
    </View>
  );
}
