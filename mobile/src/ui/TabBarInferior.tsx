import { Pressable, Text, View } from 'react-native';
import { colorAccentoTexto, colorBorde, colorSuperficie, colorTextoSecundario } from './theme';

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
  return (
    <View className={`flex-row border-t ${colorBorde} ${colorSuperficie}`}>
      {TABS.map((tab) => {
        const activa = tab.id === tabActiva;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onCambiarTab(tab.id)}
            className="flex-1 items-center py-3"
          >
            <Text
              className={
                activa ? `text-sm font-semibold ${colorAccentoTexto}` : `text-sm ${colorTextoSecundario}`
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
