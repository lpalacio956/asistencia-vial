import { useContext } from 'react';
import { ServiciosContext, ServiciosContextValor } from './servicios.context';

export function useServicios(): ServiciosContextValor {
  const contexto = useContext(ServiciosContext);
  if (!contexto) {
    throw new Error('useServicios debe usarse dentro de un ServiciosProvider');
  }
  return contexto;
}
