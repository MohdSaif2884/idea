const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_ROOT = process.cwd();

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.wasm': 'application/wasm'
};

function send404(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
}

function send500(res, err) {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Server Error: ' + (err && err.code ? err.code : 'UNKNOWN'));
}

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(reqUrl.pathname);

    // Prevent path traversal
    pathname = path.normalize(pathname).replace(/^\/+/, '');
    if (pathname.includes('..')) {
      send404(res);
      return;
    }

    let filePath = path.join(PUBLIC_ROOT, pathname || 'index.html');

    try {
      const stats = await fs.promises.stat(filePath);
      if (stats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
    } catch (err) {
      // If the exact path doesn't exist, try adding .html (e.g., /about -> /about.html)
      if (!path.extname(filePath)) {
        const tryHtml = filePath + '.html';
        try {
          const htmlStats = await fs.promises.stat(tryHtml);
          if (htmlStats.isFile()) filePath = tryHtml;
        } catch (err2) {
          // ignore, will handle below
        }
      }
    }

    // Final check - ensure file exists and is a file
    let finalStats;
    try {
      finalStats = await fs.promises.stat(filePath);
      if (!finalStats.isFile()) {
        send404(res);
        return;
      }
    } catch (err) {
      send404(res);
      return;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    const content = await fs.promises.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  } catch (err) {
    send500(res, err);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
