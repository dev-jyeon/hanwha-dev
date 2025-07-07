import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { GlobalLoader } from './GlobalLoader.tsx';
import { useCallCommonCode } from './hook/useCommonCode.ts';

const queryClient = new QueryClient();
const arr = Array.from({ length: 20 }, (_, idx) => `/posts/${idx + 1}`);

const App = () => {
  const { data } = useCallCommonCode(arr);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(
  <QueryClientProvider client={queryClient}>
    <GlobalLoader>
      <App />
    </GlobalLoader>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
