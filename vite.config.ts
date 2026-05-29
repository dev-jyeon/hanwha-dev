// import { defineConfig, loadEnv } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd());

//   console.log(`this mode is ${env.VITE_APP_ENV}`);
//   return {
//     plugins: [
//       react({
//         babel: {
//           plugins: ['@emotion/babel-plugin'],
//         },
//       }),
//     ],
//     server: {
//       port: 8080,
//       proxy: {
//         '/api': {
//           target: env.VITE_APP_API_BASE_URL,
//         },
//       },
//     },
//     root: '.',
//   };
// });

// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    {
      name: 'exclude-pub-pages',
      enforce: 'pre', // 초기 단계에서 처리
      resolveId(source, importer) {
        if (!importer) return null;

        const resolved = path.resolve(path.dirname(importer), source);

        if (resolved.includes('/src/app/pub/pages/') && resolved.endsWith('.tsx')) {
          return resolved; // 강제 resolve
        }

        return null;
      },
      load(id) {
        if (id.includes('/src/app/pub/pages/') && id.endsWith('.tsx')) {
          console.log(`[vite-plugin] Ignored: ${id}`);
          return 'export default () => null'; // 빈 컴포넌트로 대체
        }
        return null;
      },
    },
  ],
});
