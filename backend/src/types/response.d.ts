export interface ErrorItem {
    campo: string;
    mensagem: string;
}
export interface ValidationResponse {
    status: 'aprovado' | 'rejeitado';
    erros: ErrorItem[];
}
//# sourceMappingURL=response.d.ts.map