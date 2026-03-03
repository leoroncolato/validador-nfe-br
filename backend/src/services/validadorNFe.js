import {} from '../models/nf-e.js';
import {} from '../types/validation.js';
import { validateCNPJ, validateCFOP, validateMath } from '../validators/index.js';
// A ordem implementada foi: estrutural/formatação -> semântica -> matemática
const defaultPipeline = [
    validateCNPJ,
    validateCFOP,
    validateMath
];
export const runValidations = (nfe, pipeline = defaultPipeline) => {
    const errors = [];
    for (const validator of pipeline) {
        const result = validator(nfe);
        if (result) {
            if (Array.isArray(result)) {
                errors.push(...result);
            }
            else {
                errors.push(result);
            }
        }
    }
    // Retorna apenas a lista de erros. Array vazio = Sucesso.
    return errors;
};
//# sourceMappingURL=validadorNFe.js.map