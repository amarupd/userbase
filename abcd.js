const http = require('http');

const hostname = 'ec2-13-232-179-88.ap-south-1.compute.amazonaws.com';
const port = 3000;

const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('This is the Admin Side!\n');
});

server.listen(port, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
});

