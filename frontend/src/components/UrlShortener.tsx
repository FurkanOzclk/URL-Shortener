import React, { useState } from 'react';
import './UrlShortener.css';

interface ApiResponse {
  shortUrl: string;
  message?: string;
}

const UrlShortener: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShortUrl(null);
    setCopySuccess(false);
    setValidationError(null);

    // URL doğrulama
    if (!originalUrl.trim()) {
      setValidationError('Lütfen bir URL girin');
      return;
    }

    if (!validateUrl(originalUrl)) {
      setValidationError('Lütfen geçerli bir URL girin');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/url/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Bir hata oluştu');
        return;
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError('Sunucuya bağlanılamıyor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        setError('Kopyalama başarısız oldu');
      }
    }
  };

  return (
    <div className="url-shortener">
      <div className="container">
        <h1>URL Kısaltıcı</h1>
        <p className="description">Uzun URL'lerinizi kısa ve paylaşılabilir bağlantılara dönüştürün.</p>
        
        <form onSubmit={handleSubmit} className="form" noValidate>
          <div className="input-group">
            <input
              type="url"
              placeholder="URL girin"
              value={originalUrl}
              onChange={(e) => {
                setOriginalUrl(e.target.value);
                setValidationError(null);
              }}
              className="url-input"
            />
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Kısaltılıyor...' : 'Kısalt'}
            </button>
          </div>
          {validationError && (
            <div className="validation-error">
              <span>⚠️</span> {validationError}
            </div>
          )}
        </form>

        {error && (
          <div className="error-message">
            <span>⚠️</span> {error}
          </div>
        )}

        {shortUrl && (
          <div className="result">
            <div className="short-url-container">
              <a 
                href={shortUrl.startsWith('http') ? shortUrl : `http://${shortUrl}`} 
                target="_blank" 
                rel="noreferrer"
                className="short-url"
              >
                {shortUrl}
              </a>
              <button 
                onClick={handleCopy}
                className="copy-button"
              >
                {copySuccess ? '✓ Kopyalandı!' : 'Kopyala'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="design-side">
        <div className="design-element">
          <h2>URL'lerinizi Kısaltın</h2>
          <p>
            Uzun ve karmaşık URL'lerinizi kısa, hatırlanabilir bağlantılara dönüştürün.
            Hızlı, güvenli ve ücretsiz URL kısaltma hizmetimizle bağlantılarınızı kolayca paylaşın.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
