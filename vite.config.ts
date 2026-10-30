import { createServer, defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { createReadStream } from 'node:fs';
import { copyFile, readFile, writeFile } from 'node:fs/promises';
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

function staticPortfolio(): Plugin {
  return {
    name: 'static-portfolio',
    apply: 'build',
    async closeBundle() {
      const server = await createServer({
        configFile: false, base: '/portfolio-pdf/', plugins: [react()],
        server: { middlewareMode: true }, appType: 'custom', logLevel: 'error',
      });
      try {
        const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
        const html = await readFile('dist/index.html', 'utf8');
        const root = '<div id="root"></div>';
        if (!html.includes(root)) throw new Error('Missing portfolio root for prerender');
        await writeFile('dist/index.html', html.replace(root, `<div id="root">${render()}</div>`));
      } finally {
        await server.close();
      }
    },
  };
}

export default defineConfig({
  base: '/portfolio-pdf/',
  plugins: [react(), portfolioPdf(), staticPortfolio()],
});

