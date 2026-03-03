import {} from '../models/nf-e.js';
import {} from '../types/validation.js';
function validateCNPJDigits(cnpj) {
    // Lógica oficial do dígito verificador do CNPJ
    if (/^(\d)\1+$/.test(cnpj))
        return false; // Elimina sequências iguais (ex: 00000000000000)
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0)))
        return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1)))
        return false;
    return true;
}
export const validateCNPJ = (nfe) => {
    if (!nfe.emit || !nfe.emit.CNPJ) {
        return { campo: 'emit.CNPJ', mensagem: 'Tag emit.CNPJ não encontrada na nota.' };
    }
    const cnpjRaw = String(nfe.emit.CNPJ);
    const cnpjFormatado = cnpjRaw.replace(/\D/g, '');
    if (cnpjFormatado.length !== 14 || !validateCNPJDigits(cnpjFormatado)) {
        return {
            campo: 'emit.CNPJ',
            mensagem: 'CNPJ inválido: deve conter 14 dígitos numéricos e dígito verificador válido.'
        };
    }
    return null;
};
//# sourceMappingURL=cnpjValidator.js.map