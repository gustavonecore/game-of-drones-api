
const { Command } = require('simple-command-bus');

class GetGame extends Command {
	constructor(gameId) {
		super();
		this.gameId = gameId;
	}

	getGameId() {
		return this.gameId;
	}
}

module.exports = GetGame;
