import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify, { type FastifyInstance } from 'fastify';
import validateRoutes from '../../src/routes/validate.js';

describe('POST /validate', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify();
    // Registra a rota para os testes
    app.register(validateRoutes, { prefix: '/validate' });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve retornar HTTP 400 para XML mal formado', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/validate',
      body: '<nfe><emit>faltando fechamento',
      headers: { 'content-type': 'text/plain' }
    });

    expect(response.statusCode).toBe(400);
    const json = response.json();
    expect(json.status).toBe('rejeitado');
    expect(json.erros[0].campo).toBe('xml');
  });

  it('deve retornar HTTP 200 e status rejeitado para falha de negócio (matemática)', async () => {
    const xmlMock = `
      <nfeProc>
        <NFe>
          <infNFe>
            <emit><CNPJ>73492362000180</CNPJ></emit>
            <ide><CFOP>5101</CFOP></ide>
            <det><prod><vProd>10.00</vProd></prod></det>
            <total><ICMSTot><vProd>15.00</vProd><vNF>15.00</vNF></ICMSTot></total>
          </infNFe>
        </NFe>
      </nfeProc>
    `;

    const response = await app.inject({
      method: 'POST',
      url: '/validate',
      body: xmlMock,
      headers: { 'content-type': 'text/xml' }
    });

    expect(response.statusCode).toBe(200);
    const json = response.json();
    expect(json.status).toBe('rejeitado');
    expect(json.erros.some((e: any) => e.campo === 'total.vProd')).toBeTruthy();
  });
});