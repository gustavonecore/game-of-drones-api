const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./errors/errorHandler');
const notFoundHandler = require('./errors/notFoundHandler');

module.exports = ({ database, config, router }) => {
	const app = express();

	app.set('config', config);

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(cors());
	app.use(config.api.prefix, router);
	app.use(notFoundHandler());
	app.use(errorHandler());

	return {
		run: () => database.sequelize.authenticate().then(() => {
			const server = app.listen(config.server.port, () => {
				console.log(`Express server listening on port ${server.address().port}`);
			});

			return server;
		}).catch((error) => { throw error; })
	};
};
