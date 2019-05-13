const express = require('express');
const GameController = require('./controller');
const { createHttpRequestResponseHandler } = require('../../utils');

module.exports = (container) => {
	const controller = new GameController(container);

	const handler = createHttpRequestResponseHandler(controller);

	const gameRouter = express.Router();

	// Get all games
	gameRouter.get('/', handler.getGames);
	// Create a new game
	gameRouter.post('/', handler.postGame);
	// Get a game by id
	gameRouter.get('/:gameId', handler.getGame);
	// Add a movement to a game.
	gameRouter.put('/:gameId/player/:playerId', handler.postMovement);
	// Get all game's rounds
	gameRouter.get('/:gameId/round', handler.getRounds);

	return gameRouter;
};
