import React, { useState } from 'react';

interface UploadFormProps {
  onSubmit: (data: File | string) => void;
  isLoading: boolean;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onSubmit, isLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [xmlText, setXmlText] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setXmlText(''); // Limpa o textarea se um arquivo for selecionado
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setXmlText(e.target.value);
    setFile(null); // Limpa a seleção do arquivo se digitar texto
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file);
    } else if (xmlText.trim()) {
      onSubmit(xmlText);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label>
          <strong>Upload de arquivo XML:</strong><br/>
          <input type="file" accept=".xml" onChange={handleFileChange} disabled={isLoading} />
        </label>
      </div>
      
      <div>
        <label>
          <strong>Ou cole o XML aqui:</strong><br/>
          <textarea
            value={xmlText}
            onChange={handleTextChange}
            disabled={isLoading}
            rows={10}
            style={{ width: '100%', maxWidth: '600px' }}
          />
        </label>
      </div>

      <button 
        type="submit" 
        disabled={isLoading || (!file && !xmlText.trim())}
        style={{ padding: '10px', cursor: 'pointer', maxWidth: '150px' }}
      >
        {isLoading ? 'Validando...' : 'Validar NF-e'}
      </button>
    </form>
  );
};