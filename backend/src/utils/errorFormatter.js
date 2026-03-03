import {} from '../types/validation.js';
import {} from '../types/response.js';
export const formatValidationResponse = (erros) => {
    // Filtra possíveis nulls por segurança
    const cleanErrors = erros.filter((e) => e !== null);
    return {
        status: cleanErrors.length === 0 ? 'aprovado' : 'rejeitado',
        erros: cleanErrors
    };
};
export const formatParsingError = (mensagem) => {
    return {
        status: 'rejeitado',
        erros: [{ campo: 'xml', mensagem }]
    };
};
//# sourceMappingURL=errorFormatter.js.map