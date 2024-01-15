
global.base_dir = __dirname;
global.abs_path = function(path) {
	return base_dir + path;
}
global.include = function(file) {
	return require(abs_path('/' + file));
}

const http = require('http')
const app = require('./app')
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;


async function startServer() {
    server.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}...`)
    })
}

startServer();

