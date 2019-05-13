module.exports = {
	development: {
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		dialect: 'mysql',
		dialectOptions: {},
	},
	test: {
		username: 'database_test',
		password: null,
		database: 'database_test',
		host: '127.0.0.1',
		dialect: 'mysql'
	},
	production: {
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		dialect: 'mysql',
		dialectOptions: {},
	}
};
