require('dotenv').config();

const container = require('./src/container');

const server = container.resolve('server');

server.run().catch((error) => {
	console.error('Something went wrong:', error);
	process.exit();
});
