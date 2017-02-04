var http = require('http');
port = 1535;
console.log("listening on port ", port)
http.createServer(function(req, res) {
    console.dir(req.url);

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end('ok ' + req.url);
}).listen(1535);
