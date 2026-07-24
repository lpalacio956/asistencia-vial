import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ServiciosProvider } from './src/servicios/state/servicios.context';
import { ListaServiciosScreen } from './src/servicios/ui/ListaServiciosScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ServiciosProvider>
        <ListaServiciosScreen />
        <StatusBar style="auto" />
      </ServiciosProvider>
    </SafeAreaProvider>
  );
}
