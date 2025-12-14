/**
 * Error message component for displaying API errors
 */
import styles from './ErrorMessage.module.css'

interface ErrorMessageProps {
  error: Error | string | null;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorMessage({ error, onRetry, className = '' }: ErrorMessageProps) {
  if (!error) return null;

  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <div className={`${styles['err-container']} ${className}`}>
      <h4>Error</h4>
      <p>{errorMessage}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className={styles['err-retry-btn']}
        >
          Retry
        </button>
      )}
    </div>
  );
}