import { describe, it, expect, vi } from 'vitest';
import { validateCFOP } from '../../src/validators/cfopValidator.js';
import { type NFe } from '../../src/models/nf-e.js';

// Faz um mock do arquivo JSON para garantir o estado do teste
vi.mock('../../src/config/cfop-config.json', () => ({
  default: { intraestadual_prefixes: ["5"] }
}));

describe('cfopValidator', () => {
  it('deve retornar null (aprovado) se o CFOP iniciar com o prefixo configurado', () => {
    const nfeMock = { ide: [{ CFOP: '5101' }] } as NFe;
    expect(validateCFOP(nfeMock)).toBeNull();
  });

  it('deve retornar erro se o CFOP não iniciar com o prefixo permitido', () => {
    const nfeMock = { ide: [{ CFOP: '6101' }] } as NFe; // 6 é interestadual
    const result = validateCFOP(nfeMock);
    
    expect(result).not.toBeNull();
    expect(Array.isArray(result)).toBe(true);
    expect((result as any[])[0].campo).toBe('ide.CFOP');
  });
});