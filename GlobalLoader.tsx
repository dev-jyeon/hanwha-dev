import { ReactNode } from 'react';
import { useLoading } from './hook/useLoading';

interface GlobalLoaderProps {
  children: ReactNode;
}

export function GlobalLoader({ children }: GlobalLoaderProps) {
  const { isLoading } = useLoading();

  return isLoading ? (
    <div className="global-loading">
      <div className="spinner" style={{ fontSize: '50px' }}>
        Loading...
      </div>
    </div>
  ) : (
    children
  );
}
