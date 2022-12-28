
      import { defineConfig } from 'vite';
      import react from '@vitejs/plugin-react';
      import viteTsConfigPaths from 'vite-tsconfig-paths';
      
      
      export default defineConfig({
        
        
    plugins: [
      
      react(),
      viteTsConfigPaths({
        root: '../../',
      }),
    ],
    
        
        
        test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest'
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    
  },
      });