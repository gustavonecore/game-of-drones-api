const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = ({ config }) => {
	const { database, host, username, password, dialect, dialectOptions } = config.database;

	const sequelize = new Sequelize(database, username, password, { host, dialect, dialectOptions });

	const dir = path.join(__dirname, './models');
	const models = {};

	fs.readdirSync(dir).forEach(file => {
		const modelFile = path.join(dir, file);
		const model = sequelize.import(modelFile);
		models[model.name] = model;
	});

	Object.keys(models).forEach(key => {
		if ('associate' in models[key]) {
			models[key].associate(models);
		}
	});

	return { sequelize, models };
};
