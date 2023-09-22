// npm init -y  ---- за да инсталираме package.json
const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
    const { method, url, statusCode } = req; // от req метода можем да си взимаме това,което ни трябва

    console.log('Server is running');


    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('Hello!');
    res.end();

});
server.listen(port);
