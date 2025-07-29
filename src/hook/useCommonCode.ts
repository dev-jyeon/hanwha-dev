import { useQueries } from '@tanstack/react-query';
import apiClient from '../api/apiClient.ts';

export function useCallCommonCode(codeMap: string[]) {
  const queryResults = useQueries({
    queries: codeMap.map((key) => ({
      queryKey: ['codeMap', key],
      queryFn: async () => {
        const response = await apiClient.get<any>(key);
        return response;
      },
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    })),
  });

  const isLoading = queryResults.some((q) => q.isLoading);
  const isError = queryResults.some((q) => q.isError);

  const data: Record<string, any> = {};
  Object.keys(codeMap).forEach((key, index) => {
    data[key] = queryResults[index]?.data;
  });

  return {
    data,
    isLoading,
    isError,
    queries: queryResults,
  };
}
