import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile";


export default defineConfig({
  base: './',
  root: './src',
  publicDir: '../public',

  build: {
    outDir: '../dist',
    emptyOutDir : true,
    target: 'esnext',
  },

  preview: {
    host: '127.0.0.1',
    port: 3000
  },

  plugins: [
    react(),
    viteSingleFile(),
  ],
  
})
