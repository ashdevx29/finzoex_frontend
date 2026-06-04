import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  optimizeDeps: {
    include: ['src/Component/chart/canvasjs.min.js'],
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          semantic: ['semantic-ui-react'],
          charts: ['recharts', 'echarts', 'echarts-for-react'],
          redux: ['redux', 'react-redux', 'redux-thunk'],
        },
      },
    },
  },
});
