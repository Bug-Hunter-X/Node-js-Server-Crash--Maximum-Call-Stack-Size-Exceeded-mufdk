const http = require('http');

const server = http.createServer((req, res) => {
  let body = '';
  let bodyLimit = 1e6; // 1MB limit

  req.on('data', chunk => {
    body += chunk.toString();
    if (body.length > bodyLimit) {
      res.writeHead(413, { 'Content-Type': 'text/plain' });
      res.end('Request Entity Too Large');
      return;
    }
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Success' }));
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });

  req.on('error', (err) => {
    console.error(err);
    res.writeHead(500);
    res.end();
  });
}).listen(3000, () => {
  console.log('Server listening on port 3000');
});