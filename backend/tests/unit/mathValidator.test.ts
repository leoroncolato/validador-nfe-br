import { describe, it, expect } from 'vitest';
import { validateMath } from '../../src/validators/mathValidator.js';
import { type NFe } from '../../src/models/nf-e.js';

describe('mathValidator', () => {
  it('deve retornar null (aprovado) quando a soma dos itens bater com o total', () => {
    const nfeMock = {
      det: [
        { vProd: '50.50' },
        { vProd: '49,50' } // testando mistura de ponto e vírgula
      ],
      total: { vProd: '100.00' }
    } as unknown as NFe;

    expect(validateMath(nfeMock)).toBeNull();
  });

  it('deve retornar erro quando a soma dos itens divergir do total', () => {
    const nfeMock = {
      det: [{ vProd: '50.00' }],
      total: { vProd: '50.01' }
    } as unknown as NFe;

    const result = validateMath(nfeMock);
    expect(result).not.toBeNull();
    expect(result?.campo).toBe('total.vProd');
    expect(result?.mensagem).toContain('difere do valor total');
  });
});