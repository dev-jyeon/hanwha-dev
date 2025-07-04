import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const GlobalLoader = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFetching > 0 || isMutating > 0) {
      setIsLoading(true);
    } else {
      const timeout = setTimeout(() => setIsLoading(false), 150); // flickering 방지
      return () => clearTimeout(timeout);
    }
  }, [isFetching, isMutating]);

  return <>{isLoading && <GlobalLoading />}</>;
};

// 예시용 로딩 컴포넌트
function GlobalLoading() {
  return (
    <div className="global-loading">
      <div className="spinner" style={{ fontSize: '50px' }}>
        Loading...
      </div>
      <style>{`
        .global-loading {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.6);
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .spinner {
          padding: 1rem;
          background: white;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}
