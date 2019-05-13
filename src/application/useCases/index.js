const createGame = require('./createGame');
const addMovement = require('./addMovement');
const getNextRound = require('./getNextRound');
const getGame = require('./getGame');
const findGames = require('./findGames');
const getRounds = require('./getRounds');
const createPlayer = require('./createPlayer');
const findPlayers = require('./findPlayers');
const getPlayer = require('./getPlayer');

module.exports = {
	getGame,
	createGame,
	addMovement,
	getNextRound,
	findGames,
	getRounds,
	createPlayer,
	findPlayers,
	getPlayer
};
