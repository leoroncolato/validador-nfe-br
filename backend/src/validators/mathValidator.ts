import { type NFe } from '../models/nf-e.js';
import { type ValidationResult } from '../types/validation.js';
import { toCents } from '../utils/numberUtils.js';

export const validateMath = (nfe: NFe): ValidationResult => {
  if (!nfe.det || !Array.isArray(nfe.det)) {
    return { campo: 'det', mensagem: 'Nenhum item encontrado na nota ou formato inválido.' };
  }
  if (!nfe.total || nfe.total.vProd === undefined) {
    return { campo: 'total.vProd', mensagem: 'Tag total.vProd não informada.' };
  }

  let sumItemsCents = 0;
  nfe.det.forEach(item => {
    sumItemsCents += toCents(item.vProd);
  });

  const totalCents = toCents(nfe.total.vProd);

  if (sumItemsCents !== totalCents) {
    return {
      campo: 'total.vProd',
      mensagem: `Valores dos itens (soma) difere do valor total da nota. Soma itens = R$ ${(sumItemsCents / 100).toFixed(2)}, total informado = R$ ${(totalCents / 100).toFixed(2)}.`
    };
  }

  return null;
};