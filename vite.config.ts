import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  console.log(`this mode is ${env.VITE_APP_ENV}`);
  return {
    plugins: [
      react({
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
        },
      },
    },
    root: '.',
  };
});
