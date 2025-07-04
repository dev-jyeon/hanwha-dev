import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
  useIsMutating,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useCallCommonCode } from './hook/useCommonCode.ts';
import { GlobalLoader } from './GlobalLoader.tsx';

const queryClient = new QueryClient();
const arr = Array.from({ length: 20 }, (_, idx) => `/posts/${idx + 1}`);

const CodeFetcher = () => {
  const { data, isLoading } = useCallCommonCode(arr);
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const App = () => {
  const [mounted, setMounted] = useState(false);

  return (
    <div>
      <button onClick={() => setMounted((prev) => !prev)}>{mounted ? '언마운트' : '마운트'}</button>
      {mounted && <CodeFetcher />}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <QueryClientProvider client={queryClient}>
    <GlobalLoader />
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
