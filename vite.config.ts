import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import * as path from 'path';

export default defineConfig({
  base: './',
  root: './src',
  publicDir: '../public',

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'esnext',
  },

  preview: {
    host: '127.0.0.1',
    port: 3000,
  },

  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },

  plugins: [react(), viteSingleFile()],
});
