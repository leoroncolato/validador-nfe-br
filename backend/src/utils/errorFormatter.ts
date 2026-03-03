import { type ValidationResult } from '../types/validation.js';
import { type ValidationResponse } from '../types/response.js';

export const formatValidationResponse = (erros: ValidationResult[]): ValidationResponse => {
  // Filtra possíveis nulls por segurança
  const cleanErrors = erros.filter((e): e is Exclude<ValidationResult, null> => e !== null);

  return {
    status: cleanErrors.length === 0 ? 'aprovado' : 'rejeitado',
    erros: cleanErrors
  };
};

export const formatParsingError = (mensagem: string): ValidationResponse => {
  return {
    status: 'rejeitado',
    erros: [{ campo: 'xml', mensagem }]
  };
};