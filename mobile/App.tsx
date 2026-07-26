import './global.css';
import { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ServiciosProvider } from './src/servicios/state/servicios.context';
import { ServiciosScreen } from './src/servicios/ui/ServiciosScreen';
import { ActividadScreen } from './src/servicios/ui/ActividadScreen';
import { TabBarInferior, TabId } from './src/ui/TabBarInferior';
import { colorFondo } from './src/ui/theme';

export default function App() {
  const [tab, setTab] = useState<TabId>('servicios');

  return (
    <SafeAreaProvider>
      <ServiciosProvider>
        <SafeAreaView className={`flex-1 ${colorFondo}`} edges={['top', 'bottom']}>
          <View className="flex-1">
            {tab === 'servicios' ? <ServiciosScreen /> : <ActividadScreen />}
          </View>
          <TabBarInferior tabActiva={tab} onCambiarTab={setTab} />
        </SafeAreaView>
        <StatusBar style="light" />
      </ServiciosProvider>
    </SafeAreaProvider>
  );
}
