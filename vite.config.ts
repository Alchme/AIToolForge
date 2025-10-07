import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  // Vite automatically loads environment variables that start with VITE_
  // No need to manually define them
});
