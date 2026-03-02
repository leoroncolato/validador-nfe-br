import { type NFe } from '../models/nf-e.js';

export type ValidationResult = { 
  campo: string; 
  mensagem: string 
} | null;

export type ValidatorFunction = (nfe: NFe) => ValidationResult | ValidationResult[];