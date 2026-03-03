import { describe, it, expect } from 'vitest';
import { toCents } from '../../src/utils/numberUtils.js';

describe('numberUtils - toCents', () => {
  it('deve converter decimais com ponto (1234.56) para inteiro (123456)', () => {
    expect(toCents('1234.56')).toBe(123456);
  });

  it('deve converter decimais com vírgula (1234,56) para inteiro (123456)', () => {
    expect(toCents('1234,56')).toBe(123456);
  });

  it('deve converter strings de inteiros (1234) corretamente (123400)', () => {
    expect(toCents('1234')).toBe(123400);
  });

  it('deve converter tipos numéricos sem perder precisão', () => {
    expect(toCents(1234.56)).toBe(123456);
  });

  it('deve retornar 0 para valores vazios ou nulos', () => {
    expect(toCents('')).toBe(0);
    expect(toCents(null as any)).toBe(0);
    expect(toCents(undefined)).toBe(0);
  });
});