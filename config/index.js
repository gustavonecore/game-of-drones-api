const merge = require('lodash/merge');
const production = require('./production');
const development = require('./development');
const test = require('./test');
const base = require('./base');
const databaseConfig = require('./database');

const configByEnvironment = { production, development, test };

let config = null;

function createConfig() {
	// Cache if exists
	if (config !== null) {
		return config;
	}

	const env = process.env.NODE_ENV || 'development';
	const database = databaseConfig[env];

	// Get config file by environment
	const envConfig = configByEnvironment[env] || {};

	config = merge({ database }, base, envConfig);

	// Build final config (overriden base with envConfig and local)
	return config;
}

module.exports = createConfig();
