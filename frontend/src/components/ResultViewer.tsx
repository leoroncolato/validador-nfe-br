import React from 'react';
import { type ValidationResponse } from '../services/api';

interface ResultViewerProps {
  result: ValidationResponse | null;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ result }) => {
  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    alert('Resultado copiado para a área de transferência!');
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultado_validacao.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Resultado da Validação</h2>
      
      {result.status === 'aprovado' ? (
        <div style={{ color: 'green', fontSize: '1.2rem', fontWeight: 'bold' }}>
          ✅ Nota aprovada
        </div>
      ) : (
        <div>
          <div style={{ color: 'red', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            ❌ Nota rejeitada
          </div>
          {result.erros && result.erros.length > 0 && (
            <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: '#f5f5f5' }}>
                <tr>
                  <th>Campo</th>
                  <th>Mensagem de Erro</th>
                </tr>
              </thead>
              <tbody>
                {result.erros.map((erro, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 'bold' }}>{erro.campo}</td>
                    <td>{erro.mensagem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
        <button onClick={handleCopy}>Copiar JSON</button>
        <button onClick={handleDownload}>Download JSON</button>
      </div>
    </div>
  );
};