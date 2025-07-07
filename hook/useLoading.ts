import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useLoading() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFetching > 0 || isMutating > 0) {
      setIsLoading(true);
    } else {
      const timeout = setTimeout(() => setIsLoading(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [isFetching, isMutating]);

  return { isLoading };
}
