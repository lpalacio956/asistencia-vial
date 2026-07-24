import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { CrearServicioSchema } from '../../domain/crear-servicio.schema';
import { TipoServicio, TipoServicioSchema } from '../../domain/servicio.schema';
import { useServicios } from '../../state/use-servicios';
import { ErrorApi } from '../../data/api.error';

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
    <View className="mb-4 rounded-xl border border-slate-200 bg-white p-4">
      <Text className="mb-2 text-sm font-semibold text-slate-900">Nuevo servicio</Text>

      <View className="mb-2 flex-row flex-wrap gap-2">
        {TipoServicioSchema.options.map((opcion) => (
          <Pressable
            key={opcion}
            onPress={() => setTipo(opcion)}
            className={`rounded-lg px-3 py-1.5 ${tipo === opcion ? 'bg-slate-900' : 'bg-slate-100'}`}
          >
            <Text
              className={`text-xs font-medium ${tipo === opcion ? 'text-white' : 'text-slate-700'}`}
            >
              {ETIQUETA_TIPO[opcion]}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        className="mb-2 rounded-lg border border-slate-200 px-3 py-2 text-sm"
      />
      <TextInput
        placeholder="Ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
        className="mb-2 rounded-lg border border-slate-200 px-3 py-2 text-sm"
      />

      {errores.map((mensaje) => (
        <Text key={mensaje} className="mb-1 text-xs text-red-600">
          {mensaje}
        </Text>
      ))}

      <Pressable
        onPress={enviar}
        disabled={enviando}
        className="mt-1 items-center rounded-lg bg-slate-900 px-3 py-2 active:bg-slate-700 disabled:opacity-50"
      >
        <Text className="text-sm font-medium text-white">
          {enviando ? 'Creando...' : 'Crear servicio'}
        </Text>
      </Pressable>
    </View>
  );
}
