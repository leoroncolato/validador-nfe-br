export interface Emitente {
    CNPJ: string;
    xNome?: string;
}
export interface ItemNFe {
    cProd: string;
    vProd: string | number;
    qCom?: string | number;
}
export interface Totais {
    vProd: string | number;
    vNF: string | number;
}
export interface Ide {
    CFOP: string | number;
}
export interface NFe {
    emit: Emitente;
    det: ItemNFe[];
    total: Totais;
    ide: Ide[];
}
//# sourceMappingURL=nf-e.d.ts.map