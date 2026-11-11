import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // relative base: the same build works on GitHub Pages (/AhsanHabib_portfolio_2026/) and at a domain root
  base: './',
  server: { port: 5173 },
  preview: { port: 4173 },
});
