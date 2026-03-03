//aqui mora a comunicação com a API
export interface ErrorItem {
    campo: string;
    mensagem: string;
  }
  
  export interface ValidationResponse {
    status: 'aprovado' | 'rejeitado';
    erros?: ErrorItem[];
  }
  
  export const validateXML = async (fileOrXml: File | string): Promise<ValidationResponse> => {
    const isFile = fileOrXml instanceof File;
    
    const options: RequestInit = {
      method: 'POST',
    };
  
    if (isFile) {
      const formData = new FormData();
      formData.append('file', fileOrXml);
      options.body = formData;
    } else {
      // Caso seja texto (colado no textarea)
      options.headers = {
        'Content-Type': 'application/xml',
      };
      options.body = fileOrXml;
    }
  

    const response = await fetch('http://localhost:3000/validate', options);
    
    return response.json();
  };