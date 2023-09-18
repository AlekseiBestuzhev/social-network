/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  test: {}
})