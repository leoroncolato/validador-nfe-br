import { describe, it, expect } from 'vitest';
import { validateCNPJ } from '../../src/validators/cnpjValidator.js';
import { type NFe } from '../../src/models/nf-e.js';

describe('cnpjValidator', () => {
  it('deve retornar null para um CNPJ válido e formatado', () => {
    // CNPJ real válido gerado para testes
    const nfeMock = { emit: { CNPJ: '73.492.362/0001-80' } } as NFe;
    expect(validateCNPJ(nfeMock)).toBeNull();
  });

  it('deve retornar null para um CNPJ válido contendo apenas números', () => {
    const nfeMock = { emit: { CNPJ: '73492362000180' } } as NFe;
    expect(validateCNPJ(nfeMock)).toBeNull();
  });

  it('deve retornar erro para um CNPJ com dígitos verificadores inválidos', () => {
    const nfeMock = { emit: { CNPJ: '73.492.362/0001-81' } } as NFe;
    const result = validateCNPJ(nfeMock);
    expect(result).not.toBeNull();
    expect(result?.campo).toBe('emit.CNPJ');
  });

  it('deve retornar erro para CNPJ inválido (dígitos errados)', () => {
    const nfe = { emit: { CNPJ: '11111111111111' } } as NFe;
    const result = validateCNPJ(nfe);
    
    expect(result).not.toBeNull();
    expect(result?.campo).toBe('emit.CNPJ');
    expect(result?.mensagem).toContain('CNPJ inválido');
  });

  it('deve retornar erro para tag ausente', () => {
    const nfeMock = { emit: {} } as NFe;
    expect(validateCNPJ(nfeMock)).not.toBeNull();
  });
});