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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* CABEÇALHO */}
      <header style={{ textAlign: 'center', padding: '3rem 1rem 2rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>Validador de NF-e BR</h1>
        <p style={{ margin: 0, opacity: 0.8 }}>Envie um arquivo XML de uma Nota Fiscal ou cole seu conteúdo abaixo.</p>
      </header>
      
      {/* CONTEÚDO PRINCIPAL (LADO A LADO) */}
      <main style={{ 
        display: 'flex', 
        flex: 1, 
        flexWrap: 'wrap', 
        gap: '2rem', 
        padding: '0 2rem', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* COLUNA ESQUERDA: Request */}
        <section style={{ 
          flex: '1 1 400px', 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border-card)',
          padding: '2rem', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, borderBottom: '2px solid var(--color-4)', paddingBottom: '0.5rem' }}>Inserir NF-e</h2>
          <UploadForm onSubmit={handleValidation} isLoading={isLoading} />
          
          {isLoading && (
            <div style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--color-4)', fontWeight: 500 }}>
              ⏳ Processando nota fiscal, aguarde...
            </div>
          )}

          {error && (
            <div style={{ color: '#ff4d4f', marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(255, 77, 79, 0.1)', border: '1px solid #ff4d4f', borderRadius: '8px' }}>
              <strong>Erro:</strong> {error}
            </div>
          )}
        </section>

        {/* COLUNA DIREITA: Response */}
        <section style={{ 
          flex: '1 1 400px', 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border-card)',
          padding: '2rem', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginTop: 0, borderBottom: '2px solid var(--color-4)', paddingBottom: '0.5rem' }}>Resultado</h2>
          {!result && !isLoading && !error && (
            <p style={{ opacity: 0.6, fontStyle: 'italic', textAlign: 'center', marginTop: '3rem' }}>
              Aguardando o envio de uma nota para validação...
            </p>
          )}
          <ResultViewer result={result} />
        </section>

      </main>

      {/* RODAPÉ */}
      <footer style={{ textAlign: 'center', padding: '2rem', marginTop: '3rem', borderTop: '1px solid var(--border-card)' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
          Desenvolvido com ☕ por{' '}
          <a 
            href="https://github.com/leoroncolato" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold' }}
          >
            Leonardo Roncolato
          </a>
        </p>
      </footer>

    </div>
  );
};

export default App;