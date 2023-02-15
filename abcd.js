const http = require('http');

// const hostname = '13.126.177.194';
const port = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
  	res.setHeader('Content-Type', 'text/plain');
  	res.end('This is the Main App!\n');
});

server.listen(port, () => {
  	console.log(`Server running at http://localhost:${port}/`);
});
