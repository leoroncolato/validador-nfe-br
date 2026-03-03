import { type NFe } from '../models/nf-e.js';
export declare class XmlParsingError extends Error {
    constructor(message: string);
}
export declare const parseNFeXML: (xmlData: string | Buffer) => NFe;
//# sourceMappingURL=conversorXml.d.ts.map