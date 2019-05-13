const Game = require('../../../domain/Game');
const GameRound = require('../../../domain/GameRound');
const Player = require('../../../domain/player');

const toPlayer = (row) => {
	if (!row) return null;
	const values = row.dataValues;

	return new Player({
		...values,
		gameWons: (values.GamesWon || []).length
	});
}

const toGame = (row) => {
	if (!row) return null;
	const values = row.dataValues;

	return new Game({
		...values,
		playerA: toPlayer(values.PlayerA),
		playerB: toPlayer(values.PlayerB),
		winner: toPlayer(values.Winner),
	});
};

const toGameRound = (row) => {
	if (!row) return null;
	const values = row.dataValues;

	return new GameRound({
		...values,
		winner: toPlayer(values.Winner || null),
	});
};

module.exports = {
	toGame,
	toGameRound,
	toPlayer,
}
