import { transicionesPermitidas } from './transiciones-estado';

describe('transicionesPermitidas', () => {
  it('desde PENDIENTE permite ASIGNADO y CANCELADO', () => {
    expect(transicionesPermitidas('PENDIENTE')).toEqual(['ASIGNADO', 'CANCELADO']);
  });

  it('desde ASIGNADO permite EN_RUTA y CANCELADO', () => {
    expect(transicionesPermitidas('ASIGNADO')).toEqual(['EN_RUTA', 'CANCELADO']);
  });

  it('desde EN_RUTA solo permite FINALIZADO (no CANCELADO)', () => {
    expect(transicionesPermitidas('EN_RUTA')).toEqual(['FINALIZADO']);
  });

  it('FINALIZADO es un estado terminal: no permite ninguna transición', () => {
    expect(transicionesPermitidas('FINALIZADO')).toEqual([]);
  });

  it('CANCELADO es un estado terminal: no permite ninguna transición', () => {
    expect(transicionesPermitidas('CANCELADO')).toEqual([]);
  });
});
