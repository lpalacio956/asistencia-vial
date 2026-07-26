import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ALTO_TAB_BAR_FLOTANTE,
  colorAccentoTexto,
  colorBordeElevado,
  colorSuperficieElevada,
  colorTextoSecundario,
  MARGEN_INFERIOR_TAB_BAR,
} from './theme';

export type TabId = 'servicios' | 'actividad';

interface Props {
  tabActiva: TabId;
  onCambiarTab: (tab: TabId) => void;
}

const TABS: { id: TabId; etiqueta: string }[] = [
  { id: 'servicios', etiqueta: 'Servicios' },
  { id: 'actividad', etiqueta: 'Actividad' },
];

export function TabBarInferior({ tabActiva, onCambiarTab }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: insets.bottom + MARGEN_INFERIOR_TAB_BAR,
        height: ALTO_TAB_BAR_FLOTANTE,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      }}
      className={`flex-row items-center rounded-full border ${colorBordeElevado} ${colorSuperficieElevada}`}
    >
      {TABS.map((tab) => {
        const activa = tab.id === tabActiva;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onCambiarTab(tab.id)}
            className="flex-1 items-center justify-center"
          >
            <Text
              className={
                activa
                  ? `text-sm font-semibold ${colorAccentoTexto}`
                  : `text-sm ${colorTextoSecundario}`
              }
            >
              {tab.etiqueta}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
