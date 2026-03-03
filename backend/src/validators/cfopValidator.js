import {} from '../models/nf-e.js';
import {} from '../types/validation.js';
import cfopConfig from '../config/cfop-config.json' with { type: "json" };
export const validateCFOP = (nfe) => {
    if (!nfe.ide || !Array.isArray(nfe.ide))
        return null;
    const errors = [];
    nfe.ide.forEach((ideParam) => {
        if (ideParam.CFOP) {
            const cfopStr = String(ideParam.CFOP);
            const isIntraestadual = cfopConfig.intraestadual_prefixes.some(prefix => cfopStr.startsWith(prefix));
            if (!isIntraestadual) {
                errors.push({
                    campo: 'ide.CFOP',
                    mensagem: `CFOP incompatível com operação intraestadual. Prefixos aceitos: ${cfopConfig.intraestadual_prefixes.join(', ')}. CFOP recebido: ${cfopStr}.`
                });
            }
        }
    });
    return errors.length > 0 ? errors : null;
};
//# sourceMappingURL=cfopValidator.js.map