const { createContainer, asValue, asFunction, asClass } = require('awilix');
const config = require('../config');
const server = require('./infrastructure/http/server');
const router = require('./infrastructure/http/router');
const database = require('./infrastructure/database');
const commandBus = require('./infrastructure/commandBus');
const commandHandlerLocator = require('./infrastructure/commandBus/commandHandlerLocator');
const gameRepository = require('./infrastructure/persistence/repository/sequelizeGameRepository');
const gameRoundRepository = require('./infrastructure/persistence/repository/sequelizeGameRoundRepository');
const playerRepository = require('./infrastructure/persistence/repository/sequelizePlayerRepository');

const container = createContainer();

container.register({
	config: asValue(config),
	server: asFunction(server).singleton(),
	router: asFunction(router).singleton(),
	database: asFunction(database).singleton(),
	commandBus: asFunction(commandBus).singleton(),
	commandHandlerLocator: asClass(commandHandlerLocator).singleton(),
	gameRepository: asClass(gameRepository).singleton(),
	playerRepository: asClass(playerRepository).singleton(),
	gameRoundRepository: asClass(gameRoundRepository).singleton(),
});

module.exports = container;
