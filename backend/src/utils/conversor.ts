/**
 * Converte um valor financeiro em string ou number para um inteiro em centavos.
 * Exemplo: "150.50" -> 15050 | "1.234,56" -> 123456
 */
export function toCents(value: string | number | undefined): number {
    if (value === undefined || value === null) return 0;
    if (typeof value === 'number') return Math.round(value * 100);
  
    // Substitui vírgula por ponto (caso o gerador do XML fuja do padrão) 
    // e remove qualquer caractere que não seja número, ponto ou sinal de menos
    const cleanString = value.toString().replace(',', '.').replace(/[^0-9.-]/g, '');
    
    return Math.round(parseFloat(cleanString) * 100);
  }