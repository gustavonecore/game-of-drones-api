const { Router } = require('express');
const createGameModule = require('./modules/game');
const createPlayerModule = require('./modules/player');

module.exports = (container) => {
	var apiRouter = new Router();

	const game = createGameModule(container);
	const player = createPlayerModule(container);

	apiRouter.use('/game', game.router);
	apiRouter.use('/player', player.router);

	return apiRouter;
};
