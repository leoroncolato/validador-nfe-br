export function toCents(value: string | number | undefined): number {
    if (value === undefined || value === null || value === '') return 0;
    
    // Trata separadores decimais (troca vírgula por ponto, se houver)
    const normalizedValue = String(value).replace(',', '.');
    const floatValue = parseFloat(normalizedValue);
    
    if (isNaN(floatValue)) return 0;
    
    // Multiplica por 100 e arredonda para retornar um inteiro preciso
    return Math.round(floatValue * 100);
  }