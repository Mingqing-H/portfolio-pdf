import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { createReadStream } from 'node:fs';
import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

function portfolioPdf(): Plugin {
  let building = false;
  return {
    name: 'portfolio-pdf',
    configResolved(config) { building = config.command === 'build'; },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/portfolio-pdf/portfolio.pdf') return next();
        res.setHeader('Content-Type', 'application/pdf');
        createReadStream(resolve('docs/portfolio.pdf')).pipe(res);
      });
    },
    async closeBundle() {
      if (building) await copyFile('docs/portfolio.pdf', 'dist/portfolio.pdf');
    },
  };
}

export default defineConfig({
  base: '/portfolio-pdf/',
  plugins: [react(), portfolioPdf()],
});
