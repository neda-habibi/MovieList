const statik = require('node-static');
console.log('8080')
//
// Create a node-static server instance to serve the './public' folder
//
const file = new statik.Server('.');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
	
        file.serve(request, response);
    }).resume();
}).listen(8080);