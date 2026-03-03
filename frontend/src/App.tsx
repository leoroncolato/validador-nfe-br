import React, { useState } from 'react';
import { UploadForm } from './components/UploadForm';
import { ResultViewer } from './components/ResultViewer';
import { validateXML, type ValidationResponse } from './services/api';

export const App: React.FC = () => {
  const [result, setResult] = useState<ValidationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleValidation = async (data: File | string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const validationResult = await validateXML(data);
      setResult(validationResult);
    } catch (err: any) {
      setError('Erro ao comunicar com o servidor ou processar o XML.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Validador de NF-e BR</h1>
      <p>Envie um arquivo XML de uma Nota Fiscal ou cole seu conteúdo abaixo para iniciar as validações.</p>
      
      <UploadForm onSubmit={handleValidation} isLoading={isLoading} />
      
      {isLoading && (
        <div style={{ marginTop: '2rem', fontStyle: 'italic' }}>
          ⏳ Processando, aguarde...
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          <strong>Erro:</strong> {error}
        </div>
      )}
      
      <ResultViewer result={result} />
    </div>
  );
};

export default App;