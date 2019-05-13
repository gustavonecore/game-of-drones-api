const express = require('express');
const PlayerController = require('./controller');
const { createHttpRequestResponseHandler } = require('../../utils');

module.exports = (container) => {
	const controller = new PlayerController(container);

	const handler = createHttpRequestResponseHandler(controller);

	const playerRouter = express.Router();

	// Gets all players
	playerRouter.get('/', handler.getPlayers);
	// Creates a player
	playerRouter.post('/', handler.postPlayer);
	// Gets a player by id or slug
	playerRouter.get('/:playerId', handler.getPlayer);
	// Get player's games
	playerRouter.get('/:playerId/game', handler.getPlayerGames);

	return playerRouter;
};
