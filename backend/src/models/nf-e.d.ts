export interface Emitente {
    CNPJ: string;
    xNome?: string;
  }
  
  export interface ItemNFe {
    nItem: string; // Número do item na nota tipo "1", "2"
    cProd: string;
    vProd: number; // Em centavos
    CFOP: string;
  }
  
  export interface Totais {
    vProd: number; // Em centavos
    vNF: number;   // Em centavos
  }
  
  export interface NFeContext {
    emit: Emitente;
    det: ItemNFe[];
    total: Totais;
  }