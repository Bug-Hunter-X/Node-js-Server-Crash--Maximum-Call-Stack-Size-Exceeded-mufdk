const http = require('http');

const server = http.createServer((req, res) => {
  // Without this check, the server will crash if the request body is too large
  // Leading to a 'RangeError: Maximum call stack size exceeded'
  // This is because the 'data' event will emit many times, and each time
  // The 'body' will grow causing the stack to exceed
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      // This is an example, change this according to your requirements
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