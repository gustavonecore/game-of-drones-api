const path = require('path');

module.exports = {
	api: {
		version: '0.0.1',
		prefix: '/api',
		pagination: {
			pageSize: 30,
		}
	},

	server: {
		port: process.env.PORT || 8080, host: ''
	},

	sequelize: {
		migrations: path.join(__dirname, '/../src/infrastructure/database/migrations'),
		seeders: path.join(__dirname, '/../src/infrastructure/database/seeders'),
		models: path.join(__dirname, '/../src/infrastructure/database/models'),
	},

	bus: {
		useCasesBasePath: path.join(__dirname, '/../src/application/useCases')
	},

	game: {
		max_rounds: 3,
	}
};
