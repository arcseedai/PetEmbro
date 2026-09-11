import { resolve } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

function saveContentPlugin() {
  return {
    name: 'save-content-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-content', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              fs.writeFileSync(
                resolve(__dirname, 'src/data/siteContent.json'),
                JSON.stringify(data, null, 2),
                'utf-8'
              );
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
              console.log('[ContentSync] Successfully saved siteContent.json to disk!');
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          res.statusCode = 404;
          res.end();
        }
      });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [saveContentPlugin()],
  server: {
    watch: {
      ignored: ['**/downloads/**', '**/scratch/**', '**/public/assets/New folder/**', '**/src/data/**'],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        customizer: resolve(__dirname, 'customizer.html'),
      },
    },
  },
});
