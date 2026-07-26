import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { CrearServicioSchema } from '../../domain/crear-servicio.schema';
import { TipoServicio, TipoServicioSchema } from '../../domain/servicio.schema';
import { useServicios } from '../../state/use-servicios';
import { ErrorApi } from '../../data/api.error';
import {
  colorAccento,
  colorBorde,
  colorSobreAccento,
  colorSuperficie,
  colorTextoPrimario,
  hexTextoSecundario,
} from '../../../ui/theme';

const ETIQUETA_TIPO: Record<TipoServicio, string> = {
  GRUA: 'Grúa',
  BATERIA: 'Batería',
  LLANTA: 'Llanta',
  COMBUSTIBLE: 'Combustible',
  CERRAJERIA: 'Cerrajería',
};

export function FormularioCrearServicio() {
  const { crearServicio } = useServicios();
  const [tipo, setTipo] = useState<TipoServicio>('GRUA');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState<string[]>([]);

  async function enviar() {
    const resultado = CrearServicioSchema.safeParse({ tipo, descripcion, ubicacion });
    if (!resultado.success) {
      setErrores(resultado.error.issues.map((incidencia) => incidencia.message));
      return;
    }

    setErrores([]);
    setEnviando(true);
    try {
      await crearServicio(resultado.data);
      setDescripcion('');
      setUbicacion('');
    } catch (error) {
      const mensaje = error instanceof ErrorApi ? error.message : 'No se pudo crear el servicio.';
      Alert.alert('No se pudo crear el servicio', mensaje);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View className={`mb-4 rounded-xl border ${colorBorde} ${colorSuperficie} p-4`}>
      <Text className={`mb-2 text-sm font-semibold ${colorTextoPrimario}`}>Nuevo servicio</Text>

      <View className="mb-2 flex-row flex-wrap gap-2">
        {TipoServicioSchema.options.map((opcion) => (
          <Pressable
            key={opcion}
            onPress={() => setTipo(opcion)}
            className={`rounded-lg px-3 py-1.5 ${tipo === opcion ? colorAccento : 'bg-neutral-800'}`}
          >
            <Text
              className={`text-xs font-medium ${tipo === opcion ? colorSobreAccento : 'text-neutral-300'}`}
            >
              {ETIQUETA_TIPO[opcion]}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="Descripción"
        placeholderTextColor={hexTextoSecundario}
        value={descripcion}
        onChangeText={setDescripcion}
        className={`mb-2 rounded-lg border ${colorBorde} bg-neutral-800 px-3 py-2 text-sm ${colorTextoPrimario}`}
      />
      <TextInput
        placeholder="Ubicación"
        placeholderTextColor={hexTextoSecundario}
        value={ubicacion}
        onChangeText={setUbicacion}
        className={`mb-2 rounded-lg border ${colorBorde} bg-neutral-800 px-3 py-2 text-sm ${colorTextoPrimario}`}
      />

      {errores.map((mensaje) => (
        <Text key={mensaje} className="mb-1 text-xs text-red-400">
          {mensaje}
        </Text>
      ))}

      <Pressable
        onPress={enviar}
        disabled={enviando}
        className={`mt-1 items-center rounded-lg ${colorAccento} px-3 py-2 active:opacity-80 disabled:opacity-50`}
      >
        <Text className={`text-sm font-medium ${colorSobreAccento}`}>
          {enviando ? 'Creando...' : 'Crear servicio'}
        </Text>
      </Pressable>
    </View>
  );
}
